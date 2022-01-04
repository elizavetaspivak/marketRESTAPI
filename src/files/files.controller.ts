import {Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {JwtAuthQuard} from "../auth/quards/jwt.quard";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadFileDto} from "./DTO/upload-file-dto";
import {FilesService} from "./files.service";
import {MFile} from "./mfile.class";

@Controller('files')
export class FilesController{
    constructor(private readonly filesService: FilesService) {
    }

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthQuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() files: Express.Multer.File): Promise<UploadFileDto[]>{
        const saveArray: MFile[] = [files]
        if(files.mimetype.includes('image')){
            const webp = await this.filesService.convertToWebP(files.buffer)
            saveArray.push({originalname: `${files.originalname.split('.')[0]}.webp`, buffer: webp})
        }
        return this.filesService.saveFiles(saveArray);
    }
}