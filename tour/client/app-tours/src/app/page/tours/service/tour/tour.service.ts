import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {TourRestService} from "../rest/tour-rest.service";
import {Observable, ReplaySubject, Subject, of} from "rxjs";
import {ITour, ITourFilter, TourType} from "@tour/lib-dto-js";
import {TourLocationRestService} from "../rest/tour-location-rest.service";
import {TourNearestRestService} from "../rest/tour-nearest-rest.service";

@Injectable()
export class TourService implements OnInit, OnDestroy{

  // Коллекция полученных туров
  private tours: ITour[] | undefined

  // Общаемся с другими чз подписной объект (1 -- Выдаем только последнее актуальное)
  private sbjTours: ReplaySubject<ITour[] | undefined> = new ReplaySubject<ITour[] | undefined>(1);

  // Фильтр туров
  private sbjFilter = new Subject<ITourFilter>
  readonly tourFilter$: Observable<ITourFilter> = this.sbjFilter.asObservable()
  private tourType: ITourFilter | undefined

  constructor(
    private rest: TourRestService,
    private restTourLocation: TourLocationRestService,
    private restTourNearest: TourNearestRestService
  ) { }

  ngOnInit(): void {
    this.tourFilter$.subscribe(tourType=> {
      console.log("TourService::tourType$.subscribe", tourType)
      this.tourType = tourType
      this.toursPublicate()
    })
  }

  ngOnDestroy(): void {
    this.tourFilter$?.subscribe()
  }

  private LoadTours() {

    // Избегаем повторных вызовов
    if(this.tours) {
      return
    }

    // Загружаем с REST
    this.tours = []
    this.rest.getTours().subscribe((data) => {
      this.tours = data
      this.toursPublicate()
    })
  }

  private toursPublicate(): void {

    // Формируем чистый вариант
    let tours: ITour[] | undefined

    // Фильтруем по типу
    switch(this.tourType?.type) {
      case undefined:
      case "all":
        tours = [...(this.tours as ITour[])]
        break;
      case "single":
      case "multi":
        tours = [...((this.tours as ITour[]).filter(tour => tour.type === this.tourType?.type))]
        break;
    }

    // Фильтруем по дате
    if(this.tourType?.date) {
      // const dateWithoutTime = new Date(data.date).toISOString().split('T');
      // const dateValue = dateWithoutTime[0]
      // console.log('dateValue',dateValue)
      // this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);

    }

    // Публикуем появление данных
    this.sbjTours.next(tours)
  }

  getTours$(): Observable<ITour[] | undefined> {
    // Загружаем
    this.LoadTours()
    // Отдаем подписку
    return this.sbjTours
  }

  setFilter(tourType: ITourFilter) {
    this.tourType = tourType
    this.toursPublicate()
  }

 findTour(id: string | null): ITour | null {
    if(!id || !this.tours) {
      return null
    }
    return this.tours.find((tour) => tour._id?.toLowerCase() === id.toLowerCase()) || null
  }

  public TestError() {
    return this.rest.testError()
  }

  getToursNearest() {
    return this.restTourNearest.getToursNearest()
  }

  getTourLocation() {
    return this.restTourLocation.getTourLocation()
  }

  createTour(tour: ITour) {
    return this.rest.create(tour)
  }

  imageAdd(id: string | undefined, img: File) {
    return this.rest.img_add(id || "", img)
  }

  imageAdd2(id: string | undefined, img: File) {
    return this.rest.img_add2(id || "", img)
  }

  getTour(id: string) {
    return this.rest.getTour(id)
  }
}
