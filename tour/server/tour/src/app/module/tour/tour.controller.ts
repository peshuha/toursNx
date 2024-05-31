import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors, Response, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Express } from 'express'
import { Multer, diskStorage } from 'multer';
import { TourService } from './tour.service';
import { ITour, TourDto, TourType } from '@tour/lib-dto-js';
import { Tour, TourDocument } from '../../mongo/tour';
import { ConfigService } from '../../config/config.service';
import { v4 as uuidv4 } from 'uuid'
import { Public } from '../auth/auth.public';

@Controller('tour')
export class TourController {

    constructor(
        private tour: TourService
    ){}

    @Get()
    async getAll() {
        console.log("TourController::getAll()")
        return this.tour.getAll().then((tours: TourDocument[]) => 
            tours.map(tour => {
                const t =  {
                    ...tour.toObject()
                    // К этим полям обращаемся только через индекс
                    , img: undefined
                    , imgs: undefined
                    , files: undefined
                }
    
                console.log("TourController::getAll", t, tour)
                return t
            })
        )
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        console.log("TourController::getById()", id)
        return this.tour.getById(id).then((tour: TourDocument) => {
            const t =  {
                ...tour.toObject()
                // К этим полям обращаемся только через индекс
                , img: undefined
                , imgs: undefined
                , files: undefined
            }

            console.log("TourController::getById", t, tour)
            return t
        })
    }

    @Post("syntetic-initialize")
    async intialize(@Body("n") n: number) {
        return this.tour.syntetic_intialize(n)
    }

    @Delete("syntetic-reset")
    async syntetic_reset() {
        return this.tour.syntetic_reset()
    }

    @Post("create")
    async create(@Body("tour") tour: ITour) {
        console.log("TourController::create", tour)
        return this.tour.create(new TourDto(tour.name, tour.description, tour.tourOperator, tour.price, tour.type))
    }

    @Post("img-add")
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: ConfigService.Config().public_img.multer_path,
            filename: (
                req: Express.Request,
                file: Express.Multer.File,
                callback: (error: Error | null, filename: string) => void,
            ) => {
                const ext = file.mimetype.split("/")[1]
                const name = file.filename + "-" + uuidv4() + "." + ext
                console.log("FileInterceptor", file)
                callback(null, name)
            }
        })
    }))
    async img_add(@Body("id") id: string, @UploadedFile() file: Express.Multer.File) {
        console.log("TourController::img_add", file)
        // return new Promise(ok => {ok(null)})
        return this.tour.image_add(id, file.filename)
    }

    @Post("img-add2")
    @UseInterceptors(FileInterceptor('img'))
    async img_add2(@Body("id") id: string, @UploadedFile() file: Express.Multer.File) {
        console.log("TourController::img_add2", file)
        return this.tour.image_add2(id, file)
    }

}
