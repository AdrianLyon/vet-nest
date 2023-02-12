import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';

@Controller('consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}

  @Post()
  create(@Body() createConsultDto: CreateConsultDto) {
    return this.consultsService.create(createConsultDto);
  }

  @Get()
  findAll() {
    return this.consultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultDto: UpdateConsultDto) {
    return this.consultsService.update(+id, updateConsultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultsService.remove(+id);
  }
}
