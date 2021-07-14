import { Request, Response } from 'express';
import moment from 'moment';
import { IfEquals } from 'mongoose';
import Searcher from '../classes/Search/Searcher';
import SearchOneWayTrip from '../classes/Search/SearchOneWayTrip';
import SearchRoundTrip from '../classes/Search/SearchRoundTrip';
import DTO_Search from '../DTOs/dto_search';
import Flight, { IFlight } from '../models/flights/Flight';
import Plane from '../models/Plane';
import Price, { IPrice } from '../models/Price';
import Seat, { ISeat } from '../models/Seat';


export const searchFlight = async (req: Request, res: Response) => {
    const search: DTO_Search = req.body;
    let searchStrategy = new Searcher(new SearchOneWayTrip);
    switch (req.body.returnDate) {
        case null:

            searchStrategy.Strategy = new SearchOneWayTrip();
            
            break;
        case !null:

            searchStrategy.Strategy = new SearchRoundTrip();
            
            break;
    
        default:
            break;
    }

    searchStrategy.Search(search).then(data=> {
        res.send(data);
    })
}