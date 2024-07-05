import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  createInvoice(data: any) {
    this.logger.log(`Creating invoice for order: ${data}`);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
