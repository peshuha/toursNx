import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ITour } from '@tour/lib-dto-js';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private order: OrderService
    ){}
    
    @Post("create")
    async create(@Request() req, @Body("tour") tour: ITour) {
        const id = req["__user"]?._id
        console.log("OrderController::create()", tour._id, id)
        return this.order.create(tour._id, id)
    }

    @Get()
    async getAll(@Request() req) {
        const id = req["__user"]?._id
        console.log("OrderController::getAll()", id)
        return this.order.getAll(id)
    }
}
