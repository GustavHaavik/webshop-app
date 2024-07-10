import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy
  ) { }

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();

    try {
      const order = await this.ordersRepository.create(request, { session });

      await lastValueFrom(
        this.billingClient.emit('order_created', { request })
      );

      await session.commitTransaction();
      return order;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
