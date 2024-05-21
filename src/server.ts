import express from 'express';
import { sequelize } from './models';
import portfolioRoutes from './routes/portfolioRoutes';
import sharesRoutes from './routes/sharesRoutes';
import tradeRoutes from './routes/tradeRoutes';

const app = express();
app.use(express.json());

app.use('/portfolios', portfolioRoutes);
app.use('/shares', sharesRoutes);
app.use('/trades', tradeRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
