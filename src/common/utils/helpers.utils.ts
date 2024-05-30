import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
    async sendEmail(email: string): Promise<any> {
        console.log('Email sent successfully', email)

        return true
    }

}
