import { Router } from 'express';
import { Portfolio } from '../models/Portfolio';
import { PortfolioShares } from '../models/PortfolioShares';
import { Trade } from '../models/Trade';
import { Shares } from '../models/Shares';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const trades = await Trade.findAll();
        res.json(trades);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:portfolioId/buy', async (req, res) => {
    const { portfolioId } = req.params;
    const { shareId, amount } = req.body;
    
    try {

        const portfolio = await Portfolio.findByPk(portfolioId);
        if (!portfolio) {
            return res.status(404).send('Portfolio not found');
        }

        const share = await Shares.findByPk(shareId);
        if (!share) {
            return res.status(404).send('Share not found');
        }

        const transactionAmount = amount * share.price;
        if (portfolio.balance < transactionAmount) {
            return res.status(400).send('Insufficient balance');
        }

        const portfolioShare = await PortfolioShares.findOne({
            where: { portfolioId: portfolioId, shareId: shareId } 
        });
        
        if (portfolioShare) {
            portfolioShare.count += amount;
            await portfolioShare.save();
        } else {
            const portfolioShare = new PortfolioShares({
                portfolioId: Number(portfolioId),
                shareId: shareId,
                count: amount
            });
            await portfolioShare.save();
        }

        
        portfolio.balance -= transactionAmount;
        await portfolio.save();
        
        const trade = await Trade.create(
            {
                "tradeDate": new Date(),
                "amount": Number(amount),
                "tradePrice": transactionAmount,
                "portfolioId": Number(portfolioId),
                "shareId": String(shareId)
            }
        );

        res.status(201).json(trade);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:portfolioId/sell', async (req, res) => {
    const { portfolioId } = req.params;
    const { shareId, amount } = req.body;

    try {

        const portfolio = await Portfolio.findByPk(portfolioId);
        if (!portfolio) {
            return res.status(404).send('Portfolio not found');
        }

        const share = await Shares.findByPk(shareId);
        if (!share) {
            return res.status(404).send('Share not found');
        }

        const portfolioShare = await PortfolioShares.findOne({
            where: { portfolioId, shareId }
        });
        if (!portfolioShare || portfolioShare.count < amount) {
            return res.status(404).send('Share not found in portfolio');
        } else {
            portfolioShare.count -= amount;
            await portfolioShare.save();
        }

        const transactionAmount = amount * share.price;
        portfolio.balance = Number(portfolio.balance) + transactionAmount;
        await portfolio.save();


        const trade = await Trade.create(
            {
                "tradeDate": new Date(),
                "amount": -Number(amount),
                "tradePrice": transactionAmount,
                "portfolioId": Number(portfolioId),
                "shareId": String(shareId)
            }
        );
        res.status(201).json(trade);
    } catch (error) {
        res.status(400).send(error);
    }
});
   

export default router;
