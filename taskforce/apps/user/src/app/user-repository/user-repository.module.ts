import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionDatabaseNameEnum } from '@taskforce/shared-types';
import { CustomerUserEntity, CustomerUserSchema } from './entity/customer-user.entity';
import { PerformerUserEntity, PerformerUserSchema } from './entity/performer-user.entity';
import { UserEntity, UserEntitySchema } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerUserEntity.name, schema: CustomerUserSchema },
      { name: PerformerUserEntity.name, schema: PerformerUserSchema },
      // {
      //   name: UserEntity.name, schema: UserEntitySchema, discriminators: [
      //   ],
      // },
    ],
    // ConnectionDatabaseNameEnum.UsersMongoDb
    ),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
