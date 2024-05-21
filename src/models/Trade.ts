import { Table, Column, Model, ForeignKey, BelongsTo, DataType, AllowNull, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Portfolio } from './Portfolio';
import { Shares } from './Shares';
import { Optional } from 'sequelize';

interface TradeAttributes {
  id: number;
  tradeDate: Date;
  amount: number;
  tradePrice: number;
  portfolioId: number;
  shareId: string;
}

interface TradeCreationAttributes extends Optional<TradeAttributes, 'id'> {}


@Table
export class Trade extends Model<TradeAttributes, TradeCreationAttributes> {

  @Column
  tradeDate!: Date;

  @Column({
    type: DataType.INTEGER,
  })
  amount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull:false
  })
  tradePrice!: number;

  @ForeignKey(() => Portfolio)
  @Column
  portfolioId!: number;

  @BelongsTo(() => Portfolio, 'portfolioId')
  portfolio!: Portfolio;

  @ForeignKey(() => Shares)
  @Column
  shareId!: string;

  @BelongsTo(() => Shares, 'shareId')
  share!: Shares;
}
