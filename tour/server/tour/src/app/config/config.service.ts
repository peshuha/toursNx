import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class ConfigService {

    static Config() {
        return {
            public_img: {
                path: join(__dirname, "..", "public/img"),
                prefix: "/public_img",
                multer_path: join(__dirname, "..", "public/img")
            }
        }
    }
}
