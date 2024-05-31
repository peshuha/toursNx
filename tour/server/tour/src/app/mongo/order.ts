/*
export  type  IOrder = ITour | {
  date?: string,
  createdAt?: string,
  avatar?: string,
  firstName?: string,
  lastName?: string,
  cardNumber?: string,
  birthDate?: string | null,
  age?: number | null,
  citizenship?: string | null
  userid?: number
}
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Order {
    
    @Prop()
    userid: string
    
    @Prop()
    tourid: string

    @Prop()
    date?: string

    @Prop()
    createdAt?: string
  }

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
