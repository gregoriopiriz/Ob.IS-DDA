import {IFlight} from '../models/flights/Flight';
import {ISeat} from '../models/Seat';
import {IPrice} from '../models/Price';

export default class DTO_SearchResult {
    public flights: IFlight[] = [];
    public seats: ISeat[] = [];
    public prices: IPrice[] = [];

    constructor(){

    }
}