import { CustomerUserEntity } from "../../app/user-memory/entities/customer-user.entity";
import { PerformerUserEntity } from "../../app/user-memory/entities/performer-user.entity";
import { UpdateCustomerUserDto } from "../../app/user/dto/update-customer-user.dto";
import { UpdatePerformerUserDto } from "../../app/user/dto/update-performer-user.dto";

export type RegistrationUserEntityType = CustomerUserEntity | PerformerUserEntity;

export type UpdateUserDtoType = UpdateCustomerUserDto | UpdatePerformerUserDto;
