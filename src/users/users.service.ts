import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({where: {firstname: user.firstname}})

    if(userFound){
      return new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user)

    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne({where: {id}})

    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return userFound
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({where:{id}})

    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const updateUser =  Object.assign(userFound, updateUserDto)
    return this.userRepository.save(updateUser)
  }

  async remove(id: number) {
    const result = await this.userRepository.delete({id})

    if(result.affected === 0){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return result
  }
}
