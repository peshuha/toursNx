import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../../mongo/order';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourService } from '../tour/tour.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name, 'order') private md: Model<Order>,
        private tour: TourService
    ) {}

    async create(tourid: string, userid: string) {
        const tour = new this.md(<Order>{tourid, userid})
        console.log("OrderService::create()", tour)
        return tour.save()
    }

    async getAll(userid: string) {
        const orders = await this.md.find({userid})
        console.log("OrderService::getAll()", orders)
        const tours =  await orders.map(async (ord: OrderDocument) => {
            const tourid: string = ord.toObject().tourid
            const tour = await this.tour.getById(tourid)
            console.log("OrderService::getAll()/tour", tourid, tour)
            return tour
        })

        console.log("OrderService::getAll()/tours", tours)
        return tours
    }
}
