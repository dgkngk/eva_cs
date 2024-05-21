import { db_host, db_port, db_name, db_user, db_password } from "../config";
import { Sequelize } from "sequelize-typescript";
import { Portfolio } from "./Portfolio";
import { Shares } from "./Shares";
import { Trade } from "./Trade";
import { PortfolioShares } from "./PortfolioShares";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  models: [Portfolio, Shares, Trade, PortfolioShares],
});

sequelize.sync({ alter: true });

export { sequelize };
