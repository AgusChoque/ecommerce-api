import { registerAs } from "@nestjs/config";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import { DataSource, DataSourceOptions } from "typeorm";

const configDb = {
    type: "postgres",
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migration: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: false
};

export default registerAs("typeorm", () => configDb);
export const connectionSource = new DataSource(configDb as DataSourceOptions);