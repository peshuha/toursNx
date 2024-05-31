import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {

    @Prop()
    login: string
    
    @Prop()
    email?: string    

    // Пока просто не возвращаем клиенту (см UserSevice)
    @Prop()
    password: string

    @Prop()
    name?: string
    
    @Prop()
    lastname?: string

    @Prop()
    cardNumber?: string

    @Prop()
    city?: string

    @Prop()
    age?: number
  }

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
