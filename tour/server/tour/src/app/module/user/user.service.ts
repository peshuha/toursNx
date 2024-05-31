import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../mongo/user';
import { Model } from 'mongoose';
import { AuthDto, UserDto } from '@tour/lib-dto-js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name, 'user') private md: Model<User>) {}

  async check(login: string, password: string) {
    return this.md.findOne({ login, password });
  }

  async getAll() {
    return this.md.find().exec();
  }

  async getByIdAsync(id: string) {
    return this.md.findById(id);
  }

  async getById(id: string) {
    return await this.md.findById(id).exec();
  }

  async create(user: UserDto) {
    console.log('UserService::create', user);

    // Есть ли такой уже
    const usr = await this.md.findOne({ login: user.login }).exec();
    if (usr) {
      throw new Error('User exists');
    }

    // Проверяем пароль
    if (!user.password || user.password?.length < 3) {
      throw new Error('Password is too little');
    }

    const usr2 = new this.md(user);
    console.log('UserService::create.user', usr2);
    return usr2.save();
  }

  async changePassword(id: string, password: string) {
    try {
      const usr = await this.md.findByIdAndUpdate(id, { password }).exec();
      console.log('changePassword', usr);
    } catch {
      return false;
    }

    return true;
  }

  async save(id: string, usr: UserDto) {
    console.log("UserService::save", id, usr)
    return this.md.findByIdAndUpdate(id, usr)
  }
}
