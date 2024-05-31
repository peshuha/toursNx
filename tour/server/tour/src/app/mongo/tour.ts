/*
    name: string = "";
    description: string = "";
    tourOperator: string = "";
    price: string = "";
    img?: string = "";
    id: string = "";
    type?: TourType = "all";
*/

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { TourType } from '@tour/lib-dto-js';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Tour {

    // @Prop()
    // _id?: String;

    @Prop()
    name: String;

    @Prop()
    description: String;

    @Prop()
    tourOperator: String;

    @Prop()
    price: String;

    @Prop()
    img?: String;

    @Prop()
    imgs?: [String];

    @Prop()
    type?: String = "all";

    @Prop()
    is_syntetic?: Boolean

    @Prop()
    files?: [String]

    @Prop()
    npics?: Number = 0
  }

export type TourDocument = HydratedDocument<Tour>;
export const TourSchema = SchemaFactory.createForClass(Tour);
