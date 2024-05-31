import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../../../../../lib-auth/src/lib/service/auth.service";
import {PersonService} from "../../../../../../service/person/person.service";
import {NotifierService} from "../../../../../../service/notifier/notifier.service";

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrl: './password-changer.component.scss'
})
export class PasswordChangerComponent implements OnInit{
  constructor(
    private auth: AuthService,
    private psn: PersonService,
    private msg: NotifierService
  ) {
  }
  psw_current = "";
  psw_confirm = "";
  psw_new = "";

  ngOnInit(): void {
  }

  OnOk() {

      this.auth.ChangePassword(this.psw_current, this.psw_new)
      .then(() => {
        return this.auth.Authorize(this.auth.GetLogin(), this.psw_new)
      })
      .then(() => {
        this.psw_current = ""
        this.psw_new = ""
        this.psw_confirm = ""
        
        this.msg.Ok("Успешно!")      
      })
      .catch((error) => {
        this.msg.Error(error.message)
      })
  }
}
