import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {TourService} from "../../service/tour/tour.service";
import {ITour} from "@tour/lib-dto-js";
import {SearchStringService} from "../../service/search-string/search-string.service";
import {Observable, ReplaySubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsSelectorDirective} from "../../../../directive/items-selector.directive";
import { ConfigService } from '@tour/lib-common';


@Component({
  selector: 'sb-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrl: './tours-list.component.scss',

})
export class ToursListComponent implements OnInit, OnDestroy  {

  imgbaseurl = ConfigService.Config?.tourservice
  inloading = true
  tours: ITour[] | undefined;
  tourFilter: Observable<string> | undefined
  elActivator: ReplaySubject<string> = new ReplaySubject<string>();

  @ViewChild("diSelector", {read: ItemsSelectorDirective, static: false}) diSelector?: ItemsSelectorDirective;
  // @ViewChild(ItemsSelectorDirective) diSelector2?: ItemsSelectorDirective;

  constructor(
    private svcTours: TourService,
    private svcSearch: SearchStringService,
    private router: Router,
    private aroute: ActivatedRoute,
    private changeDetector : ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.imgbaseurl = ConfigService.Config?.tourservice + ""
    console.log("ToursListComponent::ngOnInit()", this.imgbaseurl)
    this.svcTours.getTours$().subscribe((data) => {
      this.tours = data
      this.inloading = false
    })

    // Подписываемся на получение строки-фильтра
    this.tourFilter = this.svcSearch.getSearch()

    // Используем активацию директивы
    this.elActivator.subscribe((id: string) => {
      console.log("elActivator.subscribe", id)
      this.router.navigate(["../tour", id], {relativeTo: this.aroute})
    })
  }

  // Используем активацию своим методом чз DoubleClick
  OnDoubleClick(tour: ITour) {
    console.log("OnDoubleClick(e:Event)", tour._id)
    this.router.navigate(["../tour", tour._id], {relativeTo: this.aroute})
  }

  ngOnDestroy(): void {
    this.elActivator.unsubscribe()
  }
 }
