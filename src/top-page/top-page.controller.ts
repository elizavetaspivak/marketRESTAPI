import {Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put} from "@nestjs/common";
import {TopPageService} from "./top-page.service";
import {TopPage} from "./schemas/top-page.schema";
import {CreateTopPageDto} from "./DTO/create-top-page.dto";
import {UpdateTopPageDto} from "./DTO/update-top-page.dto";
import {FindTopPageDto} from "./DTO/find-top-page.dto";

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {

    }

    @Get(':id')
    get(@Param('id') id: string): Promise<TopPage> {
        return this.topPageService.getById(id)
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
    update(
        @Body() updateTopPageDto: UpdateTopPageDto,
        @Param('id') id: string,): Promise<TopPage> {
        return this.topPageService.update(id, updateTopPageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TopPage> {
        return this.topPageService.delete(id);
    }

    @Post()
    @HttpCode(200)
    find(@Body() findTopPageDto: FindTopPageDto): Promise<Array<TopPage>> {
        return this.topPageService.find(findTopPageDto);
    }
}
