import { Request, Response } from 'express';
import Pay from '../classes/Pay/Pay';
import Debit from '../classes/Pay/Debit';
import Credit from '../classes/Pay/Credit';
import Payment from '../classes/Pay/Payment';

export const pay = async (req: Request, res: Response) => {
    let payStrategy = new Payment(new (Debit));
    switch (req.body.paymentType) {
        case 'debit':
            payStrategy.Strategy = new (Debit);
            break;
        case 'credit':
            payStrategy.Strategy = new (Credit);
            break;

        default:
            break;
    }

    res.send(payStrategy.Pay());
}