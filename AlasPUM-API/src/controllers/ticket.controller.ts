import { Request, Response } from 'express';
import Ticket from '../models/Ticket';

export const createTicket = async (req: Request, res: Response) => {

    const newTicket = new Ticket(req.body);

    await newTicket.save();

    return res.send(newTicket);

}

export const getTicket = async (req: Request, res: Response) => {

    const ticket = Ticket.findById(req.params.id);

    return res.send(ticket);

}