import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
    constructor(private readonly toastController: ToastController) {
    }

    public async showSuccessToast(message: string, closeButtonText: string) {
        const toast = await this.toastController.create({
            message: message,
            color: 'success',
            showCloseButton: true,
            closeButtonText: closeButtonText,
            duration: 2000
        });
        toast.present();
    }

    public async showErrorToast(message: string, closeButtonText: string) {
        const toast = await this.toastController.create({
            message: message,
            color: 'danger',
            showCloseButton: true,
            closeButtonText: closeButtonText,
            duration: 2000
        });
        toast.present();
    }
}