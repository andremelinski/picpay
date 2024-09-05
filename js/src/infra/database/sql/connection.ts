import { DataSource } from "typeorm";
import { Users } from "./entities/users.entity";
import { Wallets } from "./entities/wallets.entity";
import env from "../../../main/config/env";
import { Transactions } from "./entities/transactions.entity";

export default class PostgreSQL {
  static async getDatabaseConnection(): Promise<DataSource>{
    const dataSource = await new DataSource({
      name: env.DB_NAME,
      type: 'postgres',
      host: env.DB_HOST,
      port: 5432,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      schema: env.DB_SCHEMA,
      synchronize: true,
      logging: true,
      entities:[
        Users,
        Wallets,
      Transactions
      ],
      useUTC: true
    }).initialize()
    return dataSource
  }
}