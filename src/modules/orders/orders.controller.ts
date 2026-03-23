import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UuidValidationPipe } from '../../common/pipes';
import { OrdersPaginatinDto } from './dto/orders-pagination.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PaidOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'create.order' })
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);

    const paymentSession = await this.ordersService.createPaymentSession(order);

    return {
      order,
      paymentSession,
    };
  }

  @MessagePattern({ cmd: 'find.all.orders' })
  findAll(@Payload() ordersPaginatinDto: OrdersPaginatinDto) {
    return this.ordersService.findAll(ordersPaginatinDto);
  }

  @MessagePattern({ cmd: 'find.one.order' })
  findOne(@Payload('id', UuidValidationPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update.order.status' })
  updateStatus(@Payload() updateStatusDto: UpdateStatusDto) {
    return this.ordersService.updateStatus(updateStatusDto);
  }

  @EventPattern({ cmd: 'charge.succeeded' })
  paidOrder(@Payload() paidOrderDto: PaidOrderDto) {
    return this.ordersService.paidOrder(paidOrderDto);
  }
}
