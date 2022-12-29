import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserEntity, AuthUserSchema } from '../auth-repository/entity/auth-user.entity';
import { CustomerUserEntity, CustomerUserSchema } from './entity/customer-user.entity';
import { PerformerUserEntity, PerformerUserSchema } from './entity/performer-user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerUserEntity.name, schema: CustomerUserSchema },
      { name: PerformerUserEntity.name, schema: PerformerUserSchema },
      { name: AuthUserEntity.name, schema: AuthUserSchema },
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
