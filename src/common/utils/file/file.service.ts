import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AxiosService } from '../axios';
import * as crypto from 'crypto';


export class DownloadEntity {
    buffer: Buffer;
    hash: string
}

@Injectable()
export class FileService {
    constructor(
        private readonly axiosService: AxiosService
    ) { }

    async writeFile(filePath: string, data: any): Promise<void> {
        try {
            const directory = path.dirname(filePath);

            if (!fs.existsSync(directory)) {
                // if directory doesn"t exist, create it
                fs.mkdirSync(directory);
            };

            // Write the file
            fs.writeFileSync(filePath, data);
        } catch (error) {
            console.log("Error saving image:", error)
        }
    }

    async downloadImage(url: string): Promise<DownloadEntity> {
        try {
            // Fetch the image
            const response: any = await this.axiosService.get(url, { responseType: 'arraybuffer' });

            const avatarBuffer = Buffer.from(response, 'binary');

            const hash = crypto.createHash('md5').update(avatarBuffer).digest('hex');

            const path = `${__dirname}/../../../../src/avatars/${hash}.jpg`;

            // Save the image
            await this.writeFile(path, response);

            return {
                buffer: response,
                hash: hash
            }
        } catch (error) {
            console.log("Error saving image:", error)
        }
    }

}


