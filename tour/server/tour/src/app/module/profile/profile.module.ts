import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        UserModule
    ],
    controllers: [
        ProfileController
    ],
})
export class ProfileModule {}
