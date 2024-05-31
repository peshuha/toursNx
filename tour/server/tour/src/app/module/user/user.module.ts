import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from '../../mongo/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], "user")
    ],
    controllers: [
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
