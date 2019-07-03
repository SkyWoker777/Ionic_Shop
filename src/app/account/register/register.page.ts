import { OnInit, Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    firsName: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z]+")]),
    lastName: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z]+")]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[a-zA-Z0-9]+([-._]?[a-zA-Z0-9]+)*@[a-z0-9]+[-]?([-]?[a-z0-9])+[.]([a-z]{2,})$"
      )
    ]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  constructor(private readonly authService: AuthService, public toastController: ToastController,
    public router: Router) {
  }

  ngOnInit() { }

  public login() {
      
  }
}