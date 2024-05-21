import { Router } from 'express';
import { Portfolio } from '../models/Portfolio';
import { Shares } from '../models/Shares';
import { PortfolioShares } from '../models/PortfolioShares';
import { Op } from 'sequelize';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (portfolio) {
        res.json(portfolio);
      } else {
        res.status(404).send('Portfolio not found');
      }
});

router.post('/', async (req, res) => {
    try {
      const portfolio = await Portfolio.create(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.get('/:id/portfolio_shares', async (req, res) => {
    const { id } = req.params;

    try {
        const portfolio = await Portfolio.findByPk(id);
        if (!portfolio) {
            return res.status(404).send('Portfolio not found');
        } else {
          const portfolioShares = await PortfolioShares.findAll({ where: { portfolioId: id, count: { [Op.gt]: 0 } } });
          let shares: {[key: string]: number} = {};

          for (let i = 0; i < portfolioShares.length; i++) {
              const share = await Shares.findByPk(portfolioShares[i].shareId);
              if (share) {
                  shares[share.symbol] = portfolioShares[i].count;
              }
          }

          res.json([portfolio, shares]);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;