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