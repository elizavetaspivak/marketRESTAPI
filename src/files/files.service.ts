import {Injectable} from "@nestjs/common";
import {UploadFileDto} from "./DTO/upload-file-dto";
import {format} from 'date-fns'
import {path} from 'app-root-path'
import {ensureDir, writeFile} from 'fs-extra'
import * as sharp from 'sharp'
import {MFile} from "./mfile.class";

@Injectable()
export class FilesService{

    async saveFiles(files: MFile[]): Promise<UploadFileDto[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${path}/uploads/${dateFolder}`;
        await ensureDir(uploadFolder);

        const res: UploadFileDto[] = []
        for(const file of files){
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            res.push({url: `${dateFolder}/${file.originalname}`, name: file.originalname})
        }
        return res
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer()
    }
}