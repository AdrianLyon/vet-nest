import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateConsultDto } from 'src/consults/dto/update-consult.dto';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { description: category.description },
    });

    if (categoryFound) {
      return new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoryRepository.create(category);

    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async update(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const updateCategory = Object.assign(categoryFound, UpdateConsultDto);

    return this.categoryRepository.save(updateCategory);
  }

  async delete(id: number) {
    const result = await this.categoryRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
