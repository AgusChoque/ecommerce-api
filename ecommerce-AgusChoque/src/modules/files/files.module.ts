import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { ProductsService } from '../products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/Product.entity';
import { Category } from '../categories/entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [FilesController],
  providers: [FilesService, cloudinaryConfig, ProductsService,]
})
export class FilesModule {}
