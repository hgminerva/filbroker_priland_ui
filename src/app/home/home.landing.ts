import { Component,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.landing.html',
  styleUrls: ['./home.style.css'],
})
export class HomeLanding {
  public title : string = 'Home';
  public login : string = "Login";

  constructor(
    private toastr: ToastsManager, 
    private vcr: ViewContainerRef,
    private router: Router) {

    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    if(localStorage.getItem("username")==null) {
      this.login = "Login";
    } else {
      this.login = "Logout (" + localStorage.getItem("username") + ")";
    }
  }

  public loginClick() : void {
    if(localStorage.getItem("username")==null) {
      this.router.navigate(['/account/login']);
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('token_type');
      localStorage.removeItem('username');

      this.login = "Login";
    }
  }

}