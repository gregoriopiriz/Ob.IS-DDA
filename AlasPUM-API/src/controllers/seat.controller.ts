import { Request, Response } from 'express';
import Seat, { ISeat } from '../models/Seat';


export const createSeat = async (req: Request, res: Response) => {
    if (!req.body.type || !req.body.number) {
        return res.send({ msg: "Please fill all the inputs" });
    }

    const seat = await Seat.findById(req.body.id)

    if (seat) {
        return res.send({ msg: "This seat is already registered" })
    }

    const newSeat = new Seat(req.body);

    newSeat.save();

    return res.json(newSeat);
}

export const updateSeat = (req: Request, res: Response) => {

}

export const getSeat = async (req: Request, res: Response) => {
    const seat = await Seat.findById(req.params.id)

    res.json(seat);
}

export const getAllSeat = async (req: Request, res: Response) => {
    const seats = await Seat.find()
    console.log(seats)
    res.json(seats);
}

export const getSeatsByPlaneId = async (req: Request, res: Response) => {
    console.log(req.params.id)
    const seats = {
        economySeatsQuantity: await (await Seat.find({planeId: req.params.id, type: 'Economy'})).length,
        premiumSeatsQuantity: await (await Seat.find({planeId: req.params.id, type: 'Premium'})).length,
        businessSeatsQuantity: await (await Seat.find({planeId: req.params.id, type: 'Business'})).length,
        firstClassSeatsQuantity: await (await Seat.find({planeId: req.params.id, type: 'FirstClass'})).length
    }
    console.log(seats)
    res.json(seats);
}

export const logicDelete = (req: Request, res: Response) => {

}