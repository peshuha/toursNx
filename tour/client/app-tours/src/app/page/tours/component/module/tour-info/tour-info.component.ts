import {Component, OnInit} from '@angular/core';
import {TourService} from "../../../service/tour/tour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITour} from "@tour/lib-dto-js";
import {concat, forkJoin, map, Observable, switchMap} from "rxjs";
import {TourNearestRestService} from "../../../service/rest/tour-nearest-rest.service";
import { ConfigService } from '@tour/lib-common';

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
    private aroute: ActivatedRoute
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
    throw new Error('Method not implemented.');
  }
}
