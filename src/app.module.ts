import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TransportModule } from './modules/transport/transport.module';

@Module({
  imports: [OrdersModule, PrismaModule, TransportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
