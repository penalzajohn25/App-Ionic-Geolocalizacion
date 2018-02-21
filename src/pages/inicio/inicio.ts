import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { ModalNuevoSitioPage } from '../modal-nuevo-sitio/modal-nuevo-sitio';

declare var google:any;
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  
  map:any;
  coords:any={lat:0,lng:0};

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public platform: Platform,
     public modalcrtl: ModalController,
     private geolocation: Geolocation
    ) {

     platform.ready().then(()=>{

      this.obtenerPosicion();
    
    });

  }

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res=>{
       this.coords.lat = res.coords.latitude;
       this.coords.lng = res.coords.longitude;

       this.loadmap();
    })
    .catch(

      (error)=>{
        console.log(error);
      }
    );

}

  loadmap(){
    let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center:this.coords,
      zoom:12
    });

    let miniMaker = new google.maps.Marker({
        icon: '../../assets/imgs/ubicacion.png',
        map: this.map,
        position: this.coords
    });
}

  nuevoSitio(){
    let mimodal = this.modalcrtl.create(ModalNuevoSitioPage,this.coords);
    mimodal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
