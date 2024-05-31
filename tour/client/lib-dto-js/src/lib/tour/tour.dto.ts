import { TourType } from "./i-tour-filter";
import { ITour } from "./itour";

export class TourDto implements  ITour {
    id?: string = "";
    name: string = "";
    description: string = "";
    tourOperator: string = "";
    price: string = "";
    img?: string = "";
    imgs?: string[] = [];
    type?: TourType = "all";

    constructor(
      name: string,
      description: string,
      tourOperator: string,
      price: string,
      type: TourType
    ) {
      this.name = name
      this.description = description
      this.tourOperator = tourOperator
      this.price = price
      this.type = type || "all"
      
    }
}