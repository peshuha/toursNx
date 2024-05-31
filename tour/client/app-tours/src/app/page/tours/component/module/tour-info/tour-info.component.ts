import {Component, OnInit} from '@angular/core';
import {TourService} from "../../../service/tour/tour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITour} from "@tour/lib-dto-js";
import {map} from "rxjs";
import { ConfigService } from '@tour/lib-common';
import { MessageService } from 'primeng/api';
import { OrderService } from '../order/service/order.service';

export interface ITourCarousel {
  "id": string,
  "name": string,
  "description": string,
  "tourOperator": string,
  "price": string,
  "img": string,
  "type": string,
  "locationId": string
}

@Component({
  selector: 'app-tour-info',
  templateUrl: './tour-info.component.html',
  styleUrl: './tour-info.component.scss'
})
export class TourInfoComponent implements OnInit{

  imgbaseurl = ConfigService.Config?.tourservice
  tour: ITour | null | undefined
  dtTours: ITourCarousel[] = []
  pics: number[] = []

  constructor(
    private svcTours: TourService,
    private router: Router,
    private aroute: ActivatedRoute,
    private svcOrder: OrderService,
    private msgService: MessageService
  ) {
  }

  ngOnInit(): void {

    const id = this.aroute.snapshot.paramMap.get("id")
    if(!id) {
      return
    }

    this.svcTours.getTour(id).pipe(
        map(tour => {
          console.log("TourInfoComponent::getTour/map", id)
          this.tour = tour
          this.pics = Array.from(Array(this.tour.npics).keys())
          console.log("TourInfoComponent::ngOnInit().tour", this.tour, this.pics)
          if(!this.tour) {
            this.router.navigate(["/unknown"])
          }
        })

        // Подгружаем nearest
        // , switchMap(tour => forkJoin([this.svcTours.getToursNearest(), this.svcTours.getTourLocation()]).pipe(
        //     map(dt => {
        //       console.log("TourInfoComponent::getTour/forkJoin", dt)
        //       let dtt: ITourCarousel[] = []
        //       dt[0].forEach(tn => {
        //         dtt.push(<ITourCarousel>tn)
        //       })
        //       this.dtTours = dtt

        //     })
        // ))
      ).subscribe()
  }

  Order() {

    if(!this.tour)
      return

    console.log("TourInfoComponent::Order()")
    this.svcOrder.create(this.tour).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Успешно!', detail: `Тур ${this.tour?.name} заказан!`})
      this.router.navigate(["/tours/orders"])

    })
  }
}
