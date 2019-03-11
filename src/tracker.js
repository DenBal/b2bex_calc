Vue.component('tracker', {
  data() {
      return {
       barcode: ''   
      }
  },
  template: `
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <img src="images/shape.png" class="pull-right img-mobile" alt="">
            <div class="form-group">
                <label for="track-num">Введите номер накладной:</label>
                <input v-model="barcode" class="form-control" name="barcode" id="barcode" type="text" placeholder="FSXXXXXXXXXXRU" required="">
            </div>
        </div>
    `
});

var tracker = new Vue({ 
    el: '#tracker',
    data: {
        trackInfo: [],
        parcelInfo: [],
        tracking: []
    },
    methods: {
        getTrackInfo() {
          let barcode = document.getElementById('barcode').value
          axios.get('/api/findpost.php', { params: { barcode } })
                .then((response) =>{
                    this.trackInfo = response.data
                    this.parcelInfo = this.trackInfo.parcelInfo
                    this.tracking = this.trackInfo.tracking
          }).catch( error => {
              console.log(error)
          })
        }
    }
})