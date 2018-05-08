function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component('select-location-sender', {
  data: function data() {
    return {
      city: 0
    };
  },

  props: ['locations', 'name', 'text', 'model'],
  methods: {
    onChange: function onChange(e) {
      console.log("New location is " + this.city, e);
      this.$emit('update:model', this.city);
    }
  },
  template: '\n\t\t<div>\n\t\t\t<div  v-if="locations && locations.length">\n\t\t\t\t<label>{{ name }}: </label>\n\t\t\t\t<select @change="onChange" \n\t\t\t\t\tv-model="city"   \n\t\t\t\t\tclass=\'form-control city\'>\n\t\t\t\t\t\t<option value="0">{{ text }}</option>\n\t\t\t\t\t\t<option value="45000000">\u041C\u043E\u0441\u043A\u0432\u0430</option>\n\t\t\t\t\t\t<option value="40000000">\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433</option>\n\t\t\t\t\t\t<option\n\t\t\t\t\t\t\t\tv-for="location in locations"\n\t\t\t\t\t\t\t\t:value="location.id"\n\t\t\t\t\t\t>{{ location.name }}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div v-else class="error" style="height: 54px; line-height: 54px; font-size: 16px; color: #333;">\n\t\t\t\t\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043D\u0430\u0441\u0435\u043B\u0451\u043D\u043D\u044B\u0445 \u043F\u0443\u043D\u043A\u0442\u0430\u0445\n\t\t\t</div>\n\t\t</div>\n  '
});

Vue.component('select-location-receiver', {
  data: function data() {
    return {
      city: 0
    };
  },

  props: ['locations', 'name', 'model'],
  methods: {
    onChange: function onChange(e) {
      console.log("New location is " + this.city, e);
      this.$emit('update:model', this.city);
    }
  },
  template: '\n\t\t<div style="display: inline-block; width: 49%;">\n\t\t\t<div  v-if="locations && locations.length">\n\t\t\t\t<label>{{ name }}: </label>\n\t\t\t\t<select @change="onChange" \n\t\t\t\t\tv-model="city"   \n\t\t\t\t\tclass=\'form-control city\'>\n\t\t\t\t\t\t<option value="0">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F</option>\n\t\t\t\t\t\t<option\n\t\t\t\t\t\t\t\tv-for="location in locations"\n\t\t\t\t\t\t\t\t:value="location.id"\n\t\t\t\t\t\t>{{ location.name }}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div v-else class="error" style="height: 54px; line-height: 54px; font-size: 16px; color: #333;">\n\t\t\t\t\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043D\u0430\u0441\u0435\u043B\u0451\u043D\u043D\u044B\u0445 \u043F\u0443\u043D\u043A\u0442\u0430\u0445\n\t\t\t</div>\n\t\t</div>\n  '
});

var app = new Vue({
  el: '#app',
  data: {
    countries: [],
    locations: [],
    locationSenders: [],
    results: [],
    weight: [0.1, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 31.5],
    form: {
      sender_country: 643,
      sender: null,
      receiver: 0,
      receiver_country: 643,
      weight: 0,
      doc: true
    }
  },
  watch: _defineProperty({}, 'form.country', function formCountry() {
    console.log('Country changed', this.form.country);
    this.getLocations(this.form.country);
  }),
  methods: {
    getCountries: function getCountries() {
      var _this = this;

      axios.get('http://b2bex.ru/api/countries.php').then(function (response) {
        _this.countries = response.data;
        console.log(_this.countries);
      }).catch(function (error) {
        console.log(error);
        //todo добавить вывод ошибки, что калькулятор не доступен
      });
    },
    getLocationsSender: function getLocationsSender(country_id) {
      var _this2 = this;

      axios.get('http://b2bex.ru/api/locations.php', { params: { country_id: country_id } }).then(function (response) {
        _this2.locationSenders = response.data;
        console.log(_this2.locationSenders);
      }).catch(function (error) {
        console.log(error);
        //todo добавить вывод ошибки, что калькулятор не доступен
      });
    },
    getLocations: function getLocations(country_id) {
      var _this3 = this;

      axios.get('http://b2bex.ru/api/locations.php', { params: { country_id: country_id } }).then(function (response) {
        _this3.locations = response.data;
        console.log(_this3.locations);
      }).catch(function (error) {
        console.log(error);
        //todo добавить вывод ошибки, что калькулятор не доступен
      });
    },
    delivery: function delivery() {
      var _this4 = this;

      console.log(this.form);
      axios.post('http://b2bex.ru/api/delivery.php', this.form).then(function (response) {
        _this4.results = response.data;
        console.log(response);
      }).catch(function (error) {
        console.log(error);
        //todo добавить вывод ошибки, что калькулятор не доступен
      });
    }
  },
  mounted: function mounted() {
    this.getCountries();
    this.getLocationsSender(643);
  }
});
