import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewInstaUserModel, InstaCountsModel } from 'src/app/shared/models/newInstaUser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  public user: NewInstaUserModel;

  constructor(private storage: Storage, private readonly authService: AuthService) {
    this.storage.get('instagram-user').then((val) => {
      if (val != null) {
        this.user = val;
        return;
      }
    });

      this.authService.user.subscribe(val => {
        if (!val) {
          return;
        }

        this.user = new NewInstaUserModel();
        this.user.full_name = `${this.authService.CurrentUser.firstName} ${this.authService.CurrentUser.lastName}`;
        this.user.username = "Profile";
        this.user.counts = new InstaCountsModel();
        this.user.counts.media = 0;
        this.user.counts.follows = 0;
        this.user.counts.followed_by = 0;
        this.user.profile_picture = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500";
      });
  }

}
