import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMenuType, MenuType} from "../../../../model/imenu-type";
import {DropdownChangeEvent} from "primeng/dropdown";
import {ITourFilter, TourFilter} from "@tour/lib-dto-js";
import {TourService} from "../../service/tour/tour.service";
import {NotifierService} from "../../../../service/notifier/notifier.service";
import { TourRestService } from '../../service/rest/tour-rest.service';

@Component({
  selector: 'sb-aside',
  templateUrl: './aside.component.html',
  styleUrls: ["./aside.component.scss"]
})
export class AsideComponent implements OnInit {

  menuType: IMenuType[] = [
    {type: "normal", label: "Обычный"},
    {type: "extended", label: "Расширенный"}
  ]
  @Input() mnuType: MenuType = "normal"

  menuTourType: TourFilter[] = [
    {label: 'Все', type: 'all'},
    {label: 'Одиночный', type: 'single'},
    {label: 'Групповой', type: 'multi'},
    {label: 'Подешевле', type: "un-costly"},
    {label: 'Дорогущий', type: "expensive"}
  ]
  filterTour: ITourFilter = {type: "all"}

  @Output() mnuChanged: EventEmitter<MenuType> = new EventEmitter<MenuType>()

  constructor(
    private svcTour: TourService,
    private msg: NotifierService,
    private rtour: TourRestService
  ) {
  }

  ngOnInit(): void {
  }

  OnChangeMenuType(event: DropdownChangeEvent) {
    this.mnuChanged.emit(this.mnuType)
  }

  OnChangeTourType(event: DropdownChangeEvent) {
    this.ToursFilter()
  }

  OnSelectDate(dt: Date) {
    this.ToursFilter()
  }

  private ToursFilter() {
    this.svcTour.setFilter(this.filterTour)
  }

  OnTestError() {

    this.svcTour.TestError().subscribe(
      null,
      (error) => {
        this.msg.Error('error', error.message)
      }
    )
  }

  OnToursInitialize() {

    this.rtour.initialize(10).subscribe()
  }

  OnToursReset() {

    this.rtour.reset().subscribe()
  }
}
