import { Component } from '@angular/core';
import { User } from './account.user';
import { AccountService } from './account.service';

@Component({
  templateUrl: './account.login.html',
  styleUrls: ['./account.style.css'],
})

export class AccountLogin {
  title = 'Account Login';

  user: User = {
    username: "",
    password: "",
    token: ""
  };

  constructor(private accountService: AccountService) {

  }

  public ngOnInit() {
    this.user.token = localStorage.getItem("access_token");
  }

  public login(): void {
    this.accountService.login(this.user.username,this.user.password);    
  }
}