import { Request, Response } from 'express';
import moment from 'moment';
import { IfEquals } from 'mongoose';
import { format } from 'morgan';
import Searcher from '../classes/Search/Searcher';
import SearchOneWayTrip from '../classes/Search/SearchOneWayTrip';
import SearchRoundTrip from '../classes/Search/SearchRoundTrip';
import DTO_Search from '../DTOs/dto_search';
import Flight, { IFlight } from '../models/flights/Flight';
import Plane from '../models/Plane';
import Price, { IPrice } from '../models/Price';
import Seat, { ISeat } from '../models/Seat';
import Ticket, { ITicket } from '../models/Ticket';


export const moreAndLessVoidSeats = async (req: Request, res: Response) => {
    const since = moment(req.params.since);
    const until = moment(req.params.until);

    let result = {
        mostSelled: '',
        lessSelled: ''
    }

    const allTickets = await Ticket.find();

    let tickets: ITicket[] = [];

    for (let i = 0; i < allTickets.length; i++) {
        const element = allTickets[i];

        if (moment(element.departureDate).format("DD/MM/YYYY") >= since.format("DD/MM/YYYY") && moment(element.departureDate).format( "DD/MM/YYYY") <= until.format( "DD/MM/YYYY")) {
            tickets.push(element);
        }
    }

    let map = new Map();

    let mostSelled = 0;
    let lessSelled = 0;
    for (let i = 0; i < tickets.length; i++) {
        const element = tickets[i];

        if (map.has(element.flightNumber)) {
            map.set(element.flightNumber, Number.parseInt(map.get(element.flightNumber)) + 1);
        }
        else {
            map.set(element.flightNumber, 1);
        }
    }

    for (let entry of map.entries()) {
        res.send(entry)
        console.log(entry);
    }

    return res.send(map);
}