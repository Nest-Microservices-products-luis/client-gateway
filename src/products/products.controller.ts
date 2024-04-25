import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { get } from 'http';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE} from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { error } from 'console';
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto)
  }

  @Get()
  findAllProducts(@Query() PaginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, PaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return this.client.send({ cmd: 'find_one_product' }, { id: id }).pipe(
      catchError(err => { throw new RpcException(err) })
    );

    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({cmd: 'find_one_product'}, {id:id}))
    //     return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }

  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_product' }, {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {
    return this.client.send({ cmd: 'update_product' }, {
      id,
      ...updateProductDto
    }).pipe(catchError(err => { throw new RpcException(err) }));
  }
}
