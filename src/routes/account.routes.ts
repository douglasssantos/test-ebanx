import express from 'express';
import accountController from '../controllers/account.controller';

const router = express.Router();

router.get('/', accountController.getAllAccounts);
router.post('/event', accountController.event);
router.get('/balance', accountController.balance);
router.post('/reset', accountController.deleteAllAccounts);

export default router;
