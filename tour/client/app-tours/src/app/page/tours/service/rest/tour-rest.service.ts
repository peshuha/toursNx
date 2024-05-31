import {importProvidersFrom, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "@tour/lib-dto-js";
import { ConfigService } from '@tour/lib-common';

@Injectable(
)
export class TourRestService {

  constructor(
    private http: HttpClient
  ) { }

  getTours() : Observable<ITour[]> {
    return this.http.get<ITour[]>(ConfigService.Config?.tourservice + "/tour")
  }

  getTour(id: string) : Observable<ITour> {
    return this.http.get<ITour>(ConfigService.Config?.tourservice + "/tour/" + id)
  }

  getTours0() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
  }

  testError() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/helloError')
  }

  initialize(n: number) {
    return this.http.post(ConfigService.Config?.tourservice + "/tour/syntetic-initialize", {n})
  }

  reset() {
    return this.http.delete(ConfigService.Config?.tourservice + "/tour/syntetic-reset", {})
  }

  create(tour: ITour) {
    return this.http.post<ITour>(ConfigService.Config?.tourservice + "/tour/create", {tour})
  }

  img_add(id: string, img: File) {
    console.log("TourRestService::img_add", id, img)
    const fm = new FormData
    fm.append("id", id)
    fm.append("img", img)
    return this.http.post<ITour>(ConfigService.Config?.tourservice + "/tour/img-add", fm)
  }

  img_add2(id: string, img: File) {
    console.log("TourRestService::img_add2", id, img)
    const fm = new FormData
    fm.append("id", id)
    fm.append("img", img)
    return this.http.post<ITour>(ConfigService.Config?.tourservice + "/tour/img-add2", fm)
  }
}
