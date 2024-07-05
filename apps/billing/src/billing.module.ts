import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule, RmqService } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBITMQ_URI: Joi.string().required(),
      RABBITMQ_BILLING_QUEUE: Joi.string().required(),
    }),
  }), RmqModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
