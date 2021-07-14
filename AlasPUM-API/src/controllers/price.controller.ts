import { Request, Response } from 'express';
import Price, { IPrice } from '../models/Price';
import moment from 'moment';

export const createPrices = async (req: Request, res: Response) => {
    let prices: IPrice[] = [];

    for (let i = 0; i < req.body.rows.length; i++) {
        const element = req.body.rows[i];
        const from = moment(element.from);
        const to = moment(element.to);

        let currDate = from;
        let lastDate = to;

        let dateDiff = lastDate.diff(currDate, 'days');
        let _date = currDate.clone();

        for (let j = 0; j <= dateDiff; j++) {
            let newPrice = new Price(element);
            newPrice.date = _date.toDate();
            newPrice.flightNumber = req.body.flightNumber;
            prices.push(newPrice);
            _date.add(1, 'days');
        }
    }

    for (let i = 0; i < prices.length; i++) {
        const element = prices[i];
        const price = await Price.findOne({ date: element.date })
        if (price) {
            const updatedPrice = await Price.findByIdAndUpdate(price._id, {
                economyPrice: element.economyPrice,
                premiumPrice: element.premiumPrice,
                businessPrice: element.businessPrice,
                firstClassPrice: element.firstClassPrice,
            });
        } else if (!price){
            await element.save();
        }
    }

    return res.send(prices);
}

export const updatePrice = async (req: Request, res: Response) => {

}

export const getPricesByFlight = async (req: Request, res: Response) => {
    console.log(req.params.flightNumber);

    const prices = await Price.find({ flightNumber: Number.parseInt(req.params.flightNumber) })

    res.json(prices);
}

export const getAllPrices = async (req: Request, res: Response) => {

}

export const logicDelete = async (req: Request, res: Response) => {

    const p = req.body;

    p.isActive = false;

    const deletedPrice = await Price.findByIdAndUpdate(p._id, p);

    console.log(deletedPrice);

    res.json(deletedPrice);

}