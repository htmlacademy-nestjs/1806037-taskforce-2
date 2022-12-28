
import { UserRoleEnum } from '@taskforce/shared-types';
import { UpdateUserDtoType, UserEntityType } from '../../assets/type/types';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CustomerUserEntity } from './entity/customer-user.entity';
import { PerformerUserEntity } from './entity/performer-user.entity';
import { Collection, Connection, Model, ModifyResult } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { AuthUserEntity } from './entity/auth-user.entity';
import { AuthDataUserDto } from '../auth/dto/auth-data-user.dto';

@Injectable()
export class UserRepository {
  private readonly mongoDbUsersCollection: Collection;
  private readonly mongoDbAuthUsersCollection: Collection;

  constructor (
    @InjectConnection() private readonly userMongoDbConnection: Connection,
    @InjectModel(CustomerUserEntity.name) private readonly customerUserModel: Model<CustomerUserEntity>,
    @InjectModel(PerformerUserEntity.name) private readonly performerUserModel: Model<PerformerUserEntity>,
    @InjectModel(AuthUserEntity.name) private readonly authUserModel: Model<AuthUserEntity>,
  ) {
    this.mongoDbUsersCollection = this.userMongoDbConnection.collection('users');
    this.mongoDbAuthUsersCollection = this.userMongoDbConnection.collection('authUser');
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
    return await this.mongoDbUsersCollection.findOne({
      _id: new ObjectId(id),
    }) as UserEntityType;
  }

  public async findByEmail(email: string): Promise<UserEntityType> {
    return await this.mongoDbUsersCollection.findOne({
      email: email,
    }) as UserEntityType;
  }

  public async update(id: string, dto: UpdateUserDtoType): Promise<UserEntityType> {
    console.log(dto);
    const result =  await this.mongoDbUsersCollection.findOneAndUpdate(
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
    const result = await this.mongoDbUsersCollection.findOneAndUpdate(
      {
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
    return await this.mongoDbUsersCollection.deleteOne({
      _id: new ObjectId(id),
    }) as unknown as void;
  }


  public async addAuthUser(dto: AuthDataUserDto): Promise<AuthUserEntity> {
    const newAuthUser = new AuthUserEntity().fillEntity(dto);
    const newAuthUserModel = new this.authUserModel(newAuthUser);

    return await newAuthUserModel.save();
  }

  public async removeAuthUser(email: string) {
    return await this.mongoDbAuthUsersCollection.deleteOne({
      email: email,
    });
  }

  public async getAllAuthUser() {
    const cursor = this.mongoDbAuthUsersCollection.find({});

    return await cursor.toArray();
  }

  public async getAuthUserByEmail(email: string) {
    return await this.mongoDbAuthUsersCollection.findOne({
      email: email,
    });
  }
}
