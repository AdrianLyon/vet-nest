import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesServices: CategoriesService){}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoriesServices.create(createCategoryDto);
    }

    @Get()
    findAll(){
        return this.categoriesServices.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.categoriesServices.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() updateCategoryDto: UpdateCategoryDto){
        return this.categoriesServices.update(+id, updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number){
        return this.categoriesServices.delete(+id)
    }
}
