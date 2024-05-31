import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '@tour/lib-dto-js';

@Controller('profile')
export class ProfileController {

    constructor(
        private user: UserService
    ) {
    }

    @Get()
    async profile(@Request() req) {
        const id = req["__user"]?._id
        return this.user.getById(id);
    }

    @Post("save")
    async save(@Request() req, @Body() usr: UserDto) {
        const id = req["__user"]?._id
        return this.user.save(id, usr);
    }

    @Post("changepassword")
    async changePassword(@Request() req, @Body("password") password: string, @Body("new_password") new_password: string) {
        console.log("UserController::changePassword", password)
        const id = req["__user"]?._id
        // Получаем текущий пароль 
        const usr = await this.user.getById(id)
        if(usr.password !== password) {
            throw new Error("Текущий пароль не совпадает. Отказано")
        }
        console.log("UserController::changePassword", id, new_password)

        return this.user.changePassword(id, new_password)
    }
}
