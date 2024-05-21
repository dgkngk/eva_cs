import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Portfolio } from './Portfolio';
import { Shares } from './Shares';
import { Optional } from 'sequelize';

interface PortfolioSharesAttributes {
  id: number;
  portfolioId: number;
  shareId: string;
  count: number;
}

interface PortfolioSharesCreationAttributes extends Optional<PortfolioSharesAttributes, 'id'> {}


@Table
export class PortfolioShares extends Model<PortfolioSharesAttributes, PortfolioSharesCreationAttributes> {
  @ForeignKey(() => Portfolio)
  @Column
  portfolioId!: number;

  @ForeignKey(() => Shares)
  @Column
  shareId!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    validate:{
        min:0
    }
  })
  count!: number;
}
