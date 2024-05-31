import {Component, OnInit} from '@angular/core';
import {AuthService} from "@tour/lib-auth";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import { IToken, IUser } from '@tour/lib-dto-js';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { resolve } from 'path';

@Component({
  selector: 'sb-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
  }

  login = "";
  password = "";
  email = "";
  save: boolean = false;
  error_message = "";

  ngOnInit(): void {
    this.login = this.auth.GetLogin() || "";
  }

  OnRegister() {
      this.auth.Register(this.login, this.password, this.email, this.save)
      .then((user: IUser) => {
        // Авторизуемся
        console.log("RegisterComponent::Register", user)
        return this.auth.Authorize(this.login, this.password, this.save)
      })
      .then(() => {
        this.msgService.add({ severity: 'success', summary: 'Успешно Зарегистрирован!', detail: `Добро пожаловать, ${this.login}`})
        this.router.navigate(["tours"]).then()
      }) 
      .catch ((error) => {
        this.error_message = error
        this.msgService.add({ severity: 'error', summary: error, detail: 'Ошибочкос'})
      }
    )
  }
}
