import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public navigate: any;

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private sideMenu() {
    this.navigate =
        [
            {
                title: "Home",
                url: "/home",
                icon: "home"
            },
            {
                title: "Profile",
                url: "/profile",
                icon: "contact"
            },
            {
              title: "Sign Out",
              url: "/account/login",
              icon: "log-out"
          }
        ]
}
}
