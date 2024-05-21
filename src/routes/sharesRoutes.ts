import { Router } from 'express';
import { Shares } from '../models/Shares';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const shares = await Shares.findAll();
    res.json(shares);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:symbol', async (req, res) => {
    const share = await Shares.findByPk(req.params.symbol);
    if (share) {
        res.json(share);
      } else {
        res.status(404).send('Share not found');
      }
});

router.post('/', async (req, res) => {
    try {
      const shares = await Shares.create(req.body);
      res.status(201).json(shares);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.delete('/:symbol', async (req, res) => {
    const share = await Shares.findByPk(req.params.symbol);
    if (share) {
        await share.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Share not found');
    }
});

router.put('/:symbol', async (req, res) => {
    const share = await Shares.findByPk(req.params.symbol);
    if (share) {
        await share.update(req.body);
        res.status(204).send();
    } else {
        res.status(404).send('Share not found');
    }
});


export default router;