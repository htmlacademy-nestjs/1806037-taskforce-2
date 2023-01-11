import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberEntity, EmailSubscriberSchema } from './entity/email-subscriber.entity';
import { NotifyRepository } from './notify.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberEntity.name, schema: EmailSubscriberSchema },
    ]),
  ],
  providers: [NotifyRepository],
  exports: [NotifyRepository],
})
export class NotifyRepositoryModule {}
