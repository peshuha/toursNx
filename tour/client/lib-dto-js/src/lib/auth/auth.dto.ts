import { IAuth } from './iauth';

export class AuthDto implements IAuth {
  login: string = '';
  password: string = '';
  email?: string | undefined;
}
