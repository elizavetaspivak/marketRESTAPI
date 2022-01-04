import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    UsePipes, ValidationPipe
} from "@nestjs/common";
import {TopPageService} from "./top-page.service";
import {TopPage} from "./schemas/top-page.schema";
import {CreateTopPageDto} from "./DTO/create-top-page.dto";
import {UpdateTopPageDto} from "./DTO/update-top-page.dto";
import {FindTopPageDto} from "./DTO/find-top-page.dto";
import {IdValidationPipe} from "../pipes/id-validation.pipe";
import {PAGE_NOT_FOUND} from "./top-page.constants";

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {

    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string): Promise<TopPage> {
        const page = await this.topPageService.getById(id)
        if(!page){
            throw new NotFoundException(PAGE_NOT_FOUND)
        }
        return page
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string): Promise<TopPage> {
        const page = await this.topPageService.findByAlias(alias)
        if(!page){
            throw new NotFoundException(PAGE_NOT_FOUND)
        }
        return page
    }

    @Post()
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    create(@Body() createTopPageDto: CreateTopPageDto): Promise<TopPage> {
        return this.topPageService.create(createTopPageDto);
    }

    @Put(':id')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    async update(
        @Body() updateTopPageDto: UpdateTopPageDto,
        @Param('id') id: string,): Promise<TopPage> {
        const updatedPage = await this.topPageService.update(id, updateTopPageDto)
        if(!updatedPage){
            throw new NotFoundException(PAGE_NOT_FOUND)
        }
        return updatedPage
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<TopPage> {
        const deletedPage = await this.topPageService.delete(id)
        if(!deletedPage){
            throw new NotFoundException(PAGE_NOT_FOUND)
        }
        return deletedPage
    }

    @UsePipes(new ValidationPipe())
    @Post('find')
    @HttpCode(200)
    find(@Body() findTopPageDto: FindTopPageDto): Promise<Array<TopPage>> {
        return this.topPageService.findByCategory(findTopPageDto);
    }
}
