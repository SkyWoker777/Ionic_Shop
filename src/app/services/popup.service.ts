import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class PopupService {

    constructor(private readonly alertController: AlertController) {
    }

    public async presentAlertConfirm(confirmWord: string, yesCallback) {
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: `Are you sure you want to ${confirmWord}?`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Yes',
              handler: () => {
                yesCallback();
              }
            }
          ]
        });
    
        await alert.present();
      }

}