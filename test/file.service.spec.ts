import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { FileService, DownloadEntity, AxiosService, FileModule } from '../src/common';
import * as nock from 'nock';
import * as crypto from 'crypto';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

jest.mock('fs');
jest.mock('path');
jest.mock('crypto', () => ({
    createHash: jest.fn(() => ({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn(() => 'mockedhash'),
    })),
}));

describe('FileService', () => {
    let app: INestApplication;
    let service: FileService;
    let axiosService: AxiosService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    service = app.get<FileService>(FileService);
    axiosService = app.get<AxiosService>(AxiosService);


    afterEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    describe('writeFile', () => {
        it('should create directory and write file if directory does not exist', async () => {
            const filePath = '/test/directory/file.txt';
            const data = 'file data';

            (path.dirname as jest.Mock).mockReturnValue('/test/directory');
            (fs.existsSync as jest.Mock).mockReturnValue(false);

            await service.writeFile(filePath, data);

            expect(fs.mkdirSync).toHaveBeenCalledWith('/test/directory');
            expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, data);
        });

        it('should write file if directory exists', async () => {
            const filePath = '/test/directory/file.txt';
            const data = 'file data';

            (path.dirname as jest.Mock).mockReturnValue('/test/directory');
            (fs.existsSync as jest.Mock).mockReturnValue(true);

            await service.writeFile(filePath, data);

            expect(fs.mkdirSync).not.toHaveBeenCalled();
            expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, data);
        });
    });

    describe('downloadImage', () => {
        it('should download image and save it to file', async () => {
            const url = 'http://example.com/image.jpg';
            const responseBuffer = Buffer.from('image data');
            const mockedHash = 'mockedhash';

            (axiosService.get as jest.Mock).mockResolvedValue(responseBuffer);
            (path.dirname as jest.Mock).mockReturnValue('/test/directory');

            const result: DownloadEntity = await service.downloadImage(url);

            expect(result).toEqual({
                buffer: responseBuffer,
                hash: mockedHash,
            });

            const expectedPath = path.join(__dirname, '../../../../src/avatars', `${mockedHash}.jpg`);
            expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, responseBuffer);
        });
    });
});
