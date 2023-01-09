import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { getMongoConnectionString } from "@taskforce/core";
import { ConnectionDatabaseNameEnum } from "@taskforce/shared-types";

export function getUsersMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    // connectionName: 'users',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>('mongodb.user'),
        password: configService.get<string>('mongodb.password'),
        host: configService.get<string>('mongodb.host'),
        port: configService.get<number>('mongodb.port'),
        authDatabase: configService.get<string>('mongodb.authBase'),
        databaseName: configService.get<string>('mongodb.databaseName'),
      }),
    }),
  }
}
