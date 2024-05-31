import { Controller, Get, NotFoundException, Param, Query, Response } from '@nestjs/common';
import { TourService } from '../tour/tour.service';
import { ConfigService } from '../../config/config.service';
import { Public } from '../auth/auth.public';
import { Readable } from 'stream';

@Controller()
export class ImageController {

    constructor(
        private tour: TourService
    ){}
    

    @Public()
    @Get("img")
    async img_get(@Response() res, @Query("id") id: string, @Query("idx") idx: number) {

        idx = idx || 0

        console.log("ImageController::img_get", id, idx)
        const tour = await this.tour.getById(id)
        if(!tour) {
            throw new NotFoundException('Tour not found')
        }

        // Совместимость с files
        if(tour.files && tour.files.length > idx){
            const file = tour.files[idx]
            
            // Распаковываем обратно в байты
            const buffer = Buffer.from(file, 'base64')
            console.log("ImageController::img_get -- files", buffer.buffer)
            res.set({
                'Content-Type': 'image/*',
                'Content-Length': buffer.length,
            });
            
            const stream = new Readable();

            stream.push(buffer);
            stream.push(null);
            
            return stream.pipe(res)
        }

        // Совместимость с imgs
        if(tour.imgs && tour.imgs.length > idx){
            console.log("ImageController::img_get -- imgs")
            const filename = tour.imgs[idx]
            
            // Переадресовываем на файл картинки
            res.status(302).redirect(ConfigService.Config().public_img.prefix + "/" + filename);
            return new Promise(ok => {ok(null)})
        }

        // Совместимость с img
        if(tour.img){
            console.log("ImageController::img_get -- files")
            const filename = tour.img
            
            // Переадресовываем на файл картинки
            res.status(302).redirect(ConfigService.Config().public_img.prefix + "/" + filename);
            return new Promise(ok => {ok(null)})
        }

        // Ничего не нашлось
        throw new NotFoundException('Image not found')
    }
}
