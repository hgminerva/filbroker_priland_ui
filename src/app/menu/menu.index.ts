// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'menu-root',
  templateUrl: './menu.index.html'
})
export class MenuIndex {
  public title : string = 'Menu';
  public login : string = "Login";
  public isCollapsed1 : boolean = true;
  public isCollapsed2 : boolean = true;

  constructor(
    private toastr: ToastsManager, 
    private vcr: ViewContainerRef,
    private router: Router) {

    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    if(localStorage.getItem("username")==null) {
      this.router.navigate(['/account/login']);
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

      this.toastr.success("Logout successful.");   
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    }
  }

}