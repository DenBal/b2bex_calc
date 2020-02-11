Vue.component('select-location-sender', {
  data(){
    return {
      city: 0
    }
  },
  props: ['locations', 'name', 'text', 'model'],
  methods: {
    onChange(e){
      this.$emit('update:model', this.city)
    }
  },
  template: `
        <div>
            <div  v-if="locations && locations.length">
                <label>{{ name }}: </label>
                <select @change="onChange" 
                    v-model="city"   
                    class='form-control city'>
                        <option value="0">{{ text }}</option>
                        <option value="45000000">Москва</option>
                        <option value="40000000">Санкт-Петербург</option>
                        <option
                                v-for="location in locations"
                                :value="location.id"
                        >{{ location.name }}</option>
                </select>
            </div>
            <div v-else class="error" style="height: 54px; line-height: 54px; font-size: 16px; color: #333;">
                Нет данных о населённых пунктах
            </div>
        </div>
  `
})


Vue.component('select-location-receiver', {
  data(){
    return {
      city: 0
    }
  },
  props: ['locations', 'name', 'model'],
  methods: {
    onChange(e){
      this.$emit('update:model', this.city)
    }
  },
  template: `
        <div style="display: inline-block; width: 49%;">
            <div  v-if="locations && locations.length">
                <label>{{ name }}: </label>
                <select @change="onChange" 
                    v-model="city"   
                    class='form-control city'>
                        <option value="0">Выберите место получения</option>
                        <option
                                v-for="location in locations"
                                :value="location.id"
                        >{{ location.name }}</option>
                </select>
            </div>
            <div v-else class="error" style="height: 54px; line-height: 54px; font-size: 16px; color: #333;">
                Нет данных о населённых пунктах
            </div>
        </div>
  `
})


var app = new Vue({
  el: '#calc',
  data: {
    countries: [],
    locations: [],
	  locationSenders: [],
	  results: [],
    userInfo: [],
    trackInfo:[],
    weight: [0.1, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 31.5],
     
    form: {
      sender_country: 643,
      sender: null,
      receiver: 0,
	    receiver_country: 643,
      weight: 0,
      doc: true,
	    is_st_peter: false,
    }
  },
  watch: {
    ['form.country'](){
      console.log('Country changed', this.form.country)
      this.getLocations(this.form.country)
    }
  },
  methods: {
    getCountries(){
      axios.get('http://b2bex.ru/api/countries.php')
        .then((response) => {
          this.countries = response.data
        }).catch( error => {
        console.log(error)
        //todo добавить вывод ошибки, что калькулятор не доступен
      })
    },
	getLocationsSender(country_id) {
      axios.get('http://b2bex.ru/api/locations.php', { params: { country_id } })
        .then((response) => {
          this.locationSenders = response.data
        }).catch( error => {
          console.log(error)
          //todo добавить вывод ошибки, что калькулятор не доступен
        })
    },
    getLocations(country_id) {
      axios.get('http://b2bex.ru/api/locations.php', { params: { country_id } })
        .then((response) => {
          this.locations = response.data
        }).catch( error => {
          console.log(error)
          //todo добавить вывод ошибки, что калькулятор не доступен
        })
    },
    getUserInfo() {
        axios.get('http://ip-api.com/json')
            .then((response) => {
             this.userInfo = response.data
			 this.user_city = this.userInfo.city
			 this.user_region = this.userInfo.region
			 if(this.user_region == 'SPE') {
				 this.form.is_st_peter = true
			 }
        }).catch( error => {
            console.log(error)
        })
    },
    delivery(){
      axios.post('http://b2bex.ru/api/delivery.php', this.form)
        .then(response => {
		  this.results = response.data
        })
        .catch( error => {
          console.log(error)
          //todo добавить вывод ошибки, что калькулятор не доступен
        })
    },
  },
  mounted(){
    this.getCountries()
	  this.getLocationsSender(643)
    this.getUserInfo();
  }
})