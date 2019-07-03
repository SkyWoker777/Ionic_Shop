import { Injectable } from '@angular/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Instagram } from "ng2-cordova-oauth/core";
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NewInstaUserModel } from '../shared/models/newInstaUser.model';

@Injectable()
export class InstagramService {

    private oauth: OauthCordova = new OauthCordova();

    private instagramProvider: Instagram = new Instagram({
        clientId: "26d015194fa84e0d94d2c349d503c8da",
        redirectUri: 'http://localhost/home',
        responseType: 'token',
        appScope: ['basic', 'public_content']

        /*
        appScope options are 

        basic - to read a user’s profile info and media
        public_content - to read any public profile info and media on a user’s behalf
        follower_list - to read the list of followers and followed-by users
        comments - to post and delete comments on a user’s behalf
        relationships - to follow and unfollow accounts on a user’s behalf
        likes - to like and unlike media on a user’s behalf

        */
    });

    constructor(private readonly http: HttpClient, public toastController: ToastController, private storage: Storage, private readonly router: Router) {
    }

    public login() {
        this.oauth.logInVia(this.instagramProvider).then((success) => {

            this.getInstagramUserInfo(success).subscribe(response => {
                const user: NewInstaUserModel = response.data;
                this.storage.set('instagram-user', user);
                this.router.navigate(['/home']);
            });

        }, (error) => {
            new Promise(async () => {
                const toast = await this.toastController.create({
                    message: error,
                    color: 'danger',
                    showCloseButton: true,
                    closeButtonText: 'Got it!',
                    duration: 6000
                });
                toast.present();
            });
        });
    }

    private getInstagramUserInfo(response) : Observable<any> {
        return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + response.access_token);
    }
}