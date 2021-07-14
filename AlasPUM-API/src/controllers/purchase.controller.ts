import { Request, Response } from 'express';
import Purchase from '../models/Purchase';
import nodemailer from 'nodemailer';
import { generateEmail } from '../email/email';
import Flight from '../models/flights/Flight';
import {wss} from '../index';
import Ticket from '../models/Ticket';

export const createPurchase = async (req: Request, res: Response) => {

    console.log(req.body)
    const newPurchase = new Purchase(req.body.purchase);
    const flight =  await Flight.findOne({number: Number.parseInt(req.body.purchase.flightNumber)});
    const passengers = JSON.parse(req.body.passengers);

    await newPurchase.save();

    for (let i = 0; i < passengers.length; i++) {
        const element = passengers[i];
        let ticket = {
            departureDate: req.body.targetDate,
            documentation: element.documentation,
            fullName: element.fullName,
            planeNumber: flight?.planeNumber,
            flightNumber: flight?.number 
        }
        const newTicket = new Ticket(ticket);
        await newTicket.save()
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alaspum1101@gmail.com',
            pass: 'th1gp3de'
        }
    });

    var mailOptions = {
        from: 'alaspum1101@gmail.com',
        to: req.body.purchase.email.toString(),
        subject: 'Boarding Passages',
        html: generateEmail(passengers, flight, req.body.targetDate)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    wss.clients.forEach(c=>{
        c.send('purchaseAdded')
    })

    return res.send(newPurchase);

}

export const getPurchase = async (req: Request, res: Response) => {

    const purchase = await Purchase.findById(req.params.id);

    return res.send(purchase);

}

export const getAllPurchases = async (req: Request, res: Response) => {

    const purchases = await Purchase.find();


    return res.send(purchases);

}

