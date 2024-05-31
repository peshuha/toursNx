import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { TourService } from '../../../../service/tour/tour.service';
import { ITour } from '@tour/lib-dto-js';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { of } from 'rxjs/internal/observable/of';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrl: './tour-loader.component.css',
})
export class TourLoaderComponent {

  // Ссылка на форму
  form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    tourOperator: new FormControl(),
    price: new FormControl(),
    // imgs: this.formBuilder.array([]),
    imgs: new FormControl(),
  })

  @ViewChild("files") fs: ElementRef | undefined

  constructor(
    private formBuilder: FormBuilder,
    private tour: TourService
  ){}

  OnSave(){
    const fa = <FormArray>this.form.get("imgs")
    console.log("TourLoaderComponent::OnSave().fa", fa)
    console.log("TourLoaderComponent::OnSave().fs", this.fs)

    // Берем в параметры тура все кроме картинок
    const {imgs, ...tour} = <ITour>this.form.getRawValue()
    console.log("TourLoaderComponent::OnSave().tour", tour)
    console.log("TourLoaderComponent::OnSave().imgs", imgs)
    
    const files: HTMLInputElement = this.fs?.nativeElement
    this.tour.createTour(<ITour>tour).pipe(
      concatMap((tour) => {
        console.log("TourLoaderComponent::OnSave().concatMap.tour", tour, files.files)
        if(tour._id && files.files) {
          return from(files.files).pipe(
            map(f => {
              console.log("TourLoaderComponent::OnSave().concatMap.f", f)
              return this.tour.imageAdd(tour._id, f).subscribe()
            })
          )
        }

        return of({})
    })
    ).subscribe()
  }

  OnSave2(){
    const fa = <FormArray>this.form.get("imgs")
    console.log("TourLoaderComponent::OnSave().fa", fa)
    console.log("TourLoaderComponent::OnSave().fs", this.fs)

    // Берем в параметры тура все кроме картинок
    const {imgs, ...tour} = <ITour>this.form.getRawValue()
    console.log("TourLoaderComponent::OnSave().tour", tour)
    console.log("TourLoaderComponent::OnSave().imgs", imgs)
    
    const files: HTMLInputElement = this.fs?.nativeElement
    this.tour.createTour(<ITour>tour).pipe(
      concatMap((tour) => {
        console.log("TourLoaderComponent::OnSave().concatMap.tour", tour, files.files)
        if(tour._id && files.files) {
          return from(files.files).pipe(
            map(f => {
              console.log("TourLoaderComponent::OnSave().concatMap.f", f)
              return this.tour.imageAdd2(tour._id, f).subscribe()
            })
          )
        }

        return of({})
    })
    ).subscribe()
  }

  OnSelectImage(ev: any) {
    // return
    // console.log("TourLoaderComponent::OnSelectImage()", ev)
    // const imgs = <FormArray>(this.form.get("imgs") || [])
    // imgs.clear()
    // ev.target.files.forEach(f: any => imgs.push(f))
    // .setAsyncValidators().patchValue({
    //   imgs: ev.target.files
    // })
  }
}
