import { Table, Column, Model, BelongsToMany, HasMany, DataType, PrimaryKey } from 'sequelize-typescript';
import { Portfolio } from './Portfolio';
import { PortfolioShares } from './PortfolioShares';
import { Trade } from './Trade';

@Table
export class Shares extends Model<Shares> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate:{
      len: [3,3],
      isUppercase: true
    }
  })
  symbol!: string;

  @Column({
    type: DataType.DECIMAL(10,2),
    validate: {
      min: 0
    }
  })
  price!: number;

  @BelongsToMany(() => Portfolio, () => PortfolioShares)
  portfolios!: Portfolio[];

  @HasMany(() => Trade)
  trades!: Trade[];
}

