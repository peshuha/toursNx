import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt.constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileModule } from '../profile/profile.module';
import { TourModule } from '../tour/tour.module';
import { ImageModule } from '../image/image.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tour', {
      connectionName: 'tour',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/user', {
      connectionName: 'user',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/order', {
      connectionName: 'order',
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    TourModule,
    ImageModule, 
    OrderModule, 
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
