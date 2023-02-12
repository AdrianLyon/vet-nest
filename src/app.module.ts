import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VetsModule } from './vets/vets.module';
import { CategoriesModule } from './categories/categories.module';
import { PetsModule } from './pets/pets.module';
import { ConsultsModule } from './consults/consults.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'vetdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule,
    VetsModule,
    CategoriesModule,
    PetsModule,
    ConsultsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
