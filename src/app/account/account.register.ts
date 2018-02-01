import { Component, ViewContainerRef } from '@angular/core';
import { User } from './account.user';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: './account.register.html',
  styleUrls: ['./account.style.css'],
})
export class AccountRegister {
  private registerSub: any;
  private registerMessageSub: any;

  public title: string = 'Account Register';
  public login: string;
  public register: string = "Register";

  public user: User = {
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    token: ""
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  ngOnInit() {
    if (localStorage.getItem("username") == null) {
      this.login = "Login";
    } else {
      this.router.navigate(['/menu']);
    }
  }

  ngOnDestroy() {
    if (this.registerSub != null) this.registerSub.unsubscribe();
  }

  public btnRegisterClick(): void {
    this.accountService.register(this.user);

    this.registerMessageSub = this.accountService.registerErrorMessageObservable.subscribe(
      dataString => {
        var stringMessages = [];
        if (dataString.length > 0) {
          for (var i = 0; i < dataString.length; i++) {
            if (dataString[i].successMessageArray != null) {
              var successMessageArray = dataString[i].successMessageArray;
              for (var ss = 0; ss < successMessageArray.length; ss++) {
                stringMessages.push(successMessageArray[ss].message);
              }
            }

            if (dataString[i].mainErrorMessageArray != null) {
              var mainErrorMessageArray = dataString[i].mainErrorMessageArray;
              for (var mn = 0; mn < mainErrorMessageArray.length; mn++) {
                stringMessages.push(mainErrorMessageArray[mn].message);
              }
            }

            if (dataString[i].fullnameErrorMessageArray != null) {
              var fullnameErrorMessageArray = dataString[i].fullnameErrorMessageArray;
              for (var fn = 0; fn < fullnameErrorMessageArray.length; fn++) {
                stringMessages.push(fullnameErrorMessageArray[fn].message);
              }
            }

            if (dataString[i].usernameErrorMessageArray != null) {
              var usernameErrorMessageArray = dataString[i].usernameErrorMessageArray;
              for (var un = 0; un < usernameErrorMessageArray.length; un++) {
                stringMessages.push(usernameErrorMessageArray[un].message);
              }
            }

            if (dataString[i].passwordErrorMessageArray != null) {
              var passwordErrorMessageArray = dataString[i].passwordErrorMessageArray;
              for (var ps = 0; ps < passwordErrorMessageArray.length; ps++) {
                stringMessages.push(passwordErrorMessageArray[ps].message);
              }
            }

            if (dataString[i].confirmPasswordErrorMessageArray != null) {
              var confirmPasswordErrorMessageArray = dataString[i].confirmPasswordErrorMessageArray;
              for (var cps = 0; cps < confirmPasswordErrorMessageArray.length; cps++) {
                stringMessages.push(confirmPasswordErrorMessageArray[cps].message);
              }
            }
          }
        }

        this.registerSub = this.accountService.registerObservable.subscribe(
          dataNumber => {
            if (dataNumber == 1) {
              this.toastr.success(stringMessages.join("\n\n"));
              setTimeout(() => {
                this.router.navigate(['/account/login']);
              }, 1000);
            } else if (dataNumber == 0) {
              this.toastr.error(stringMessages.join("\n\n"));
            }
          }
        );
      }
    );
  }

  public loginClick(): void {
    if (localStorage.getItem("username") == null) {
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