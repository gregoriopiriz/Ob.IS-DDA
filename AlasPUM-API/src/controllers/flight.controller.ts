import { Request, Response } from 'express';
import NationalFlight, { INationalFlight } from '../models/flights/NationalFlight';
import RegionalFlight, { IRegionalFlight } from '../models/flights/RegionalFlight';
import IntecontinentalFlight, { IIntercontinentalFlight } from '../models/flights/IntercontinentalFlight';
import IntercontinentalFlight from '../models/flights/IntercontinentalFlight';
import Flight from '../models/flights/Flight';


export const createFlight = async (req: Request, res: Response) => {

    switch (req.body.type) {
        case 'National':
            const nationalFlight = await NationalFlight.findOne({ number: req.body.number })

            if (nationalFlight) {
                return res.send({ msg: "This flight is already registered" })
            }

            const newNationalFlight = new NationalFlight(req.body);

            newNationalFlight.save();

            return res.json(newNationalFlight);

        case 'Regional':
            const regionalFlight = await NationalFlight.findOne({ number: req.body.number })

            if (regionalFlight) {
                return res.send({ msg: "This flight is already registered" })
            }

            const newRegionalFlight = new RegionalFlight(req.body);

            newRegionalFlight.save();

            return res.json(newRegionalFlight);

        case 'Intercontinental':
            const intercontinerntalFlight = await NationalFlight.findOne({ number: req.body.number })

            if (intercontinerntalFlight) {
                return res.send({ msg: "This flight is already registered" })
            }

            const newIntercontinerntalFlight = new IntecontinentalFlight(req.body);

            newIntercontinerntalFlight.save();

            return res.json(newIntercontinerntalFlight);

        default:
            break;
    }
}

export const updateFlight = async (req: Request, res: Response) => {

    switch (req.body.type) {
        case 'National':
            const nationalFlight = await NationalFlight.findByIdAndUpdate(req.params.id, req.body);

            return res.json(nationalFlight);

        case 'Regional':
            const regionalFlight = await NationalFlight.findByIdAndUpdate(req.params.id, req.body);

            return res.json(regionalFlight);

        case 'Intercontinental':
            const intercontinerntalFlight = await NationalFlight.findByIdAndUpdate(req.params.id, req.body);

            return res.json(intercontinerntalFlight);

        default:
            break;
    }
}

export const getFlight = async (req: Request, res: Response) => {
    const f = await Flight.findById(req.params.id);

    return res.send(f);
}

export const getAllFlights = async (req: Request, res: Response) => {

    const Flights = await NationalFlight.find({isActive: true});

    res.json(Flights);

}

export const logicDelete = async (req: Request, res: Response) => {
    const f = req.body;

    f.isActive = false
    
    var deletedPlane;

    switch (f.type) {
        case 'National':
            deletedPlane = await NationalFlight.findByIdAndUpdate(f._id, f);
            break;
        case 'Regional':
            deletedPlane = await RegionalFlight.findByIdAndUpdate(f._id, f);
            break;
        case 'Intercontinental':
            deletedPlane = await IntercontinentalFlight.findByIdAndUpdate(f._id, f);
            break;
        default:
            break;
    }

    console.log(deletedPlane)

    res.json(deletedPlane);
}