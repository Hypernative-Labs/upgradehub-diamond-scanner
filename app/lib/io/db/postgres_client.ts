import { DbClient, DbValue } from "./dbclient";
import { PostgresConfig } from "../../../config/config_handler";
//TODO: check if works
import { Pool } from "pg";

export class PostgresClient implements DbClient {
  private pool: Pool;

  constructor(config: PostgresConfig) {
    const cfg: any = {
      ...config,
    };
    if (cfg.sslmode === "disable") {
      cfg.ssl = false;
    } else {
      cfg.ssl = {
        rejectUnauthorized: false,
        ca: config.certificate,
      };
    }
    this.pool = new Pool(cfg);
  }

  async initialize(): Promise<void> {}

  executeQuery<T>(query: string, args: DbValue[]): Promise<T> {
    return this.pool.query(query, args);
  }
}
