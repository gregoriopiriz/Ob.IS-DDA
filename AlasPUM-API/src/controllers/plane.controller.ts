import { Request, Response } from 'express';
import Plane, { IPlane } from '../models/Plane';
import Seat, { ISeat } from '../models/Seat';
import { IRow } from '../DTOs/dto_row';

export const createPlane = async (req: Request, res: Response) => {
    console.log(req.body);

    const plane = await Plane.findOne({ number: req.body.plane.number })

    if (plane) {
        return res.send({ msg: "This plane is already registered" })
    }

    const newPlane = new Plane(req.body.plane);

    let seats: ISeat[] = [];


    req.body.rows.forEach((row: IRow) => {
        for (let i = 1; i <= row.economySeatsQuantity; i++) {
            var seat = {
                type: 'Economy',
                number: row.rowID + i.toString(),
                planeId: newPlane._id,
            };

            seats.push(new Seat(seat));
        }
        for (let i = 1; i <= row.premiumSeatsQuantity; i++) {
            var seat = {
                type: 'Premium',
                number: row.rowID + i.toString(),
                planeId: newPlane._id,
            };

            seats.push(new Seat(seat));
        }
        for (let i = 1; i <= row.businessSeatsQuantity; i++) {
            var seat = {
                type: 'Business',
                number: row.rowID + i.toString(),
                planeId: newPlane._id,
            };

            seats.push(new Seat(seat));
        }
        for (let i = 1; i <= row.firstClassSeatsQuantity; i++) {
            var seat = {
                type: 'FirstClass',
                number: row.rowID + i.toString(),
                planeId: newPlane._id,
            };

            seats.push(new Seat(seat));
        }
    });

    newPlane.save();

    seats.forEach(seat => {
        seat.save()
    });

    return res.json({ plane: newPlane, seats: seats });

}

export const updatePlane = async (req: Request, res: Response) => {
    const updatedPlane = await Plane.findByIdAndUpdate(req.body._id, req.body);

    res.json(updatePlane);
}

export const getPlane = async (req: Request, res: Response) => {
    const plane = await Plane.findById(req.params.id)

    res.json(plane);
}

export const getAllPlane = async (req: Request, res: Response) => {
    const planes = await Plane.find({ isActive: true })
    res.json(planes);
}

export const logicDelete = async (req: Request, res: Response) => {

    const p = req.body;

    p.isActive = false;

    const deletedPlane = await Plane.findByIdAndUpdate(p._id, p);

    console.log(deletedPlane)

    res.json(deletedPlane);
}