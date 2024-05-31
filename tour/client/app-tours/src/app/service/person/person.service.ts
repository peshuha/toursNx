import {Injectable} from '@angular/core';
import {ConfigService, LocalStorageService} from "@tour/lib-common";
import {IPerson} from "../../model/iperson";
import {delay, interval, map, Observable, of, switchMap, tap, timeout, timer, withLatestFrom} from "rxjs";
import {PersonRestService} from "../rest/person-rest.service";
import { HttpClient } from '@angular/common/http';
import { IUser } from '@tour/lib-dto-js';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  CONST_KEY_STORAGE_PERSON = "_persons"

  constructor(
    private storageService: LocalStorageService,
    private restPerson: PersonRestService,
    private http: HttpClient
  ) { }

  getPerson(login: string | undefined): Observable<IPerson | undefined> {
    return this.http.get<IUser>(ConfigService.Config?.tourservice + "/profile").pipe(
      map((usr:IUser) => <IPerson>{
        FirstName: usr.name,
        login: usr.login,
        Age: usr.age,
        Birthday: undefined,
        CardNum: usr.cardNumber,
        City: usr.city,
        LastName: usr.lastname
      })
    )
  }

  getPerson0(login: string | undefined): Observable<IPerson | undefined> {
    return new Observable<IPerson>((sbj) => {

      // Получаем persons
      const psn: IPerson[] = JSON.parse(this.storageService.getItem(this.CONST_KEY_STORAGE_PERSON) || JSON.stringify(<IPerson[]>[{}]))

      // Возвращаем нужного
      const p = psn.find(p => p.login === login)
      sbj.next(<IPerson>p)
      sbj.complete()
    })
  }

  savePerson(psn: IPerson): void {

    this.http.post<IUser>(ConfigService.Config?.tourservice + "/profile/save", {
      // login: psn.login,
      age: psn.Age,
      cardNumber: psn.CardNum,
      city: psn.City,
      // email: undefined,
      lastname: psn.LastName,
      name: psn.FirstName
    }).subscribe()
  }

  savePerson0(psn: IPerson): void {

    // Получаем persons
    const p: IPerson[] | never = JSON.parse(this.storageService.getItem(this.CONST_KEY_STORAGE_PERSON) || JSON.stringify(<IPerson[]>[{}]))

    // Добавляем - заменяем
    this.storageService.setItem(this.CONST_KEY_STORAGE_PERSON, JSON.stringify([
      ...p.filter(p => p.login !== psn.login)
      , psn
    ]))

    // Для д/з fake-rest
    of("").pipe(
      tap(() => console.log("start")),
      delay(5000),
      switchMap(() => this.restPerson.savePerson(psn)),
      tap(() => console.log("5000"))
    ).subscribe()
  }
}
