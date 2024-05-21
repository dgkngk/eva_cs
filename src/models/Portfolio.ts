import { Table, Column, Model, BelongsToMany, HasMany, AutoIncrement, PrimaryKey, DataType } from 'sequelize-typescript';
import { Shares } from './Shares';
import { PortfolioShares } from './PortfolioShares';
import { Trade } from './Trade';

@Table
export class Portfolio extends Model<Portfolio> {

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  })
  balance!: number;

  @BelongsToMany(() => Shares, () => PortfolioShares)
  shares!: Shares[];

  @HasMany(() => Trade)
  trades!: Trade[];
}
