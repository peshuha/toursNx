import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@tour/lib-common';
import { IOrder, ITour } from '@tour/lib-dto-js';

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {

  constructor(
    private http: HttpClient
  ) { }

  create(tour: ITour) {
    return this.http.post<IOrder>(ConfigService.Config?.tourservice + "/order/create", {tour})
  }

  getAll() {
    return this.http.get<IOrder[]>(ConfigService.Config?.tourservice + "/order")
  }
}
