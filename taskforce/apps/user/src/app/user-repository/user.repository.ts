
import { UserRoleEnum } from '@taskforce/shared-types';
import { UpdateUserDtoType, UserEntityType } from '../../assets/type/types';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CustomerUserEntity } from './entity/customer-user.entity';
import { PerformerUserEntity } from './entity/performer-user.entity';
import { Collection, Connection, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UserRepository {
  private readonly userMongoDbCollection: Collection;

  constructor (
    @InjectConnection() private readonly userMongoDbConnection: Connection,
    @InjectModel(CustomerUserEntity.name) private readonly customerUserModel: Model<CustomerUserEntity>,
    @InjectModel(PerformerUserEntity.name) private readonly performerUserModel: Model<PerformerUserEntity>,
  ) {
    this.userMongoDbCollection = this.userMongoDbConnection.collection('users');
  }

  public async create(dto: CreateUserDto): Promise<UserEntityType> {
    const {password, role} = dto;

    if (role === UserRoleEnum.Customer) {
      const newCustomerUser = new CustomerUserEntity().fillEntity(dto).setPassword(password);
      const newCustomerUserModel = new this.customerUserModel(newCustomerUser);

      return await newCustomerUserModel.save();
    }
    if (role === UserRoleEnum.Performer) {
      const newPerformerUser =  new PerformerUserEntity().fillEntity(dto).setPassword(password);
      const newPerformerUserModel = new this.performerUserModel(newPerformerUser);

      return await newPerformerUserModel.save();
    }
  }

  public async findById(id: string): Promise<UserEntityType> {
    return await this.userMongoDbCollection.findOne({
      _id: new ObjectId(id),
    }) as UserEntityType;
  }

  public async findByEmail(email: string): Promise<UserEntityType> {
    return await this.userMongoDbCollection.findOne({
      email: email,
    }) as UserEntityType;
  }

  public async update(id: string, dto: UpdateUserDtoType): Promise<UserEntityType> {
    const result =  await this.userMongoDbCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...dto,
        }
      },
      {
        returnDocument: 'after',
      }
    );

    return result.value as unknown as UserEntityType;
  }

  public async updatePassword(id: string, newPasswordHash: string): Promise<UserEntityType> {
    const result = await this.userMongoDbCollection.findOneAndUpdate({
      _id: new ObjectId(id),
    },
      {
        $set: {
          passwordHash: newPasswordHash
        },
      },
      {
        returnDocument: 'after',
      }
    );

    return result.value as UserEntityType;
  }

  public async delete(id: string): Promise<void> {
    return await this.userMongoDbCollection.deleteOne({
      _id: new ObjectId(id),
    }) as unknown as void;
  }
}
