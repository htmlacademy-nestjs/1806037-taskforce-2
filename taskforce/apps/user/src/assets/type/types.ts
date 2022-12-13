import { CustomerUserEntity } from "../../app/user-repository/entity/customer-user.entity";
import { PerformerUserEntity } from "../../app/user-repository/entity/performer-user.entity";
import { UpdateCustomerUserDto } from "../../app/user/dto/update-customer-user.dto";
import { UpdatePerformerUserDto } from "../../app/user/dto/update-performer-user.dto";

export type UserEntityType = CustomerUserEntity | PerformerUserEntity;

export type UpdateUserDtoType = UpdateCustomerUserDto | UpdatePerformerUserDto;
