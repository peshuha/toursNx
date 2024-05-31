import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { TourService } from '../tour/tour.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from '../../mongo/tour';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }], "tour")
  ],
  controllers: [ImageController],
  providers: [
    TourService
  ]
})
export class ImageModule {}
