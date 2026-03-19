import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from '../../../generated/prisma/enums';
import { OrderStatusList } from '../enum/order-status.enum';

export class UpdateStatusDto {
  @IsUUID(4)
  id!: string;
  @IsEnum(OrderStatusList, {
    message: `Status must be one of ${OrderStatusList.join(', ')}`,
  })
  status!: OrderStatus;
}
