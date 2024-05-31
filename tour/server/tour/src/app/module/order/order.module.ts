import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../mongo/order';
import { OrderService } from './order.service';
import { TourService } from '../tour/tour.service';
import { Tour, TourSchema } from '../../mongo/tour';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema:OrderSchema }], "order"),
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }], "tour")
  ],
  providers: [
    OrderService,
    TourService
  ], 
  controllers: [OrderController],
})
export class OrderModule {}
