import { OnInit, Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TokenAuthModel } from 'src/app/shared/models/api-models/tokenAuth.model';
import { InstagramService } from 'src/app/services/instagram.service';
import { Storage } from '@ionic/storage';
import { NewUserModel } from 'src/app/shared/models/newUser.model';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: "app-login",
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LogInPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[a-zA-Z0-9]+([-._]?[a-zA-Z0-9]+)*@[a-z0-9]+[-]?([-]?[a-z0-9])+[.]([a-z]{2,})$"
      )
    ]),
    password: new FormControl("", [Validators.required])
  });
  private sub: any;

  constructor(private readonly authService: AuthService, public toastService: ToastService,
    public menuCtrl: MenuController, private readonly instaService: InstagramService,
    private storage: Storage, private _location: Location) {
      this.authService.CurrentUser = null;
  }

  ngOnInit() { }

  public async login() {
    if (this.loginForm.invalid) {
      await this.toastService.showErrorToast('Incorrect email or password.', 'Got it!');
      return;
    }

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this.authService.signIn(email, password).subscribe((data: TokenAuthModel) => {
      
      if (!data || !data.accessToken) {
        return;
      }
      let user: NewUserModel = new NewUserModel();
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.email = data.email;
      user.token = data.accessToken;
      user.id = data.userId;
      this.storage.set('local-user', user);
      this.authService.CurrentUser = user;
      this.goBack();
    });
  }

  public signUpViaInstagram() {
    this.instaService.login();
  }

  public goBack() {
    this._location.back();
    this.menuCtrl.enable(true);
  }
}