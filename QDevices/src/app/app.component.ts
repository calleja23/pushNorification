import { Component,OnInit,NgZone } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { alert, confirm } from "tns-core-modules/ui/dialogs";
import * as applicationSettings from "tns-core-modules/application-settings";
import { Message, messaging } from "nativescript-plugin-firebase/messaging";
import { Router,NavigationExtras} from '@angular/router';
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
selector: "ns-app",
templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
constructor( private router: Router,private ngZone: NgZone) {}
ngOnInit(): void {
    firebase.init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onPushTokenReceivedCallback: (token) => {
          console.log('[Firebase] onPushTokenReceivedCallback:', { token });
        },
        onMessageReceivedCallback: (message) => {
          console.log('[Firebase] onMessageReceivedCallback:', { message });
          const self=this;
          let contentUrl:string=null;
          let contentType:string=null;
          let route:string="";
          if (message.foreground){
            dialogs.confirm({
              title: message.title,
              message: message.body,
              okButtonText: "open ",
              neutralButtonText: "cancel"
            }).then(function (result) {
              // result argument is boolean
              if(result){
                if (message.data.contentUrl && message.data.contentType) {
                  contentUrl = message.data.contentUrl;
                  contentType = message.data.contentType;
                  if (contentType === 'firma') {
                    route = '/firma/';
                  }
                  console.log("contentUrl",contentUrl);
                  self.router.navigate([route], { queryParams: { url: contentUrl } });
                }
              }
              console.log("Dialog result: " + result);
            });
          }else{
            if (message.contentUrl && message.contentType){
              contentUrl = message.contentUrl ;
              contentType = message.contentType;
              if(contentType==='firma'){
                route ='/firma/';
              }
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "url": contentUrl
                  }
              };
              this.ngZone.run(()=>{
                console.log("contentUrl",contentUrl);
                this.router.navigate([route], navigationExtras);
              });
            }
          }
        }
      })
        .then(() => {
          console.log('[Firebase] Initialized');
        })
        .catch(error => {
          console.log('[Firebase] Initialize', { error });
        });
}
}
