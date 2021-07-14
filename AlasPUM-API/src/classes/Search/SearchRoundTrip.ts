import DTO_Search from "../../DTOs/dto_search";
import DTO_SearchResult from "../../DTOs/dto_searchResult";
import Flight, { IFlight } from "../../models/flights/Flight";
import Plane from "../../models/Plane";
import Price, { IPrice } from "../../models/Price";
import Seat, { ISeat } from "../../models/Seat";
import Search from "./Search";

export default class SearchRoundTrip implements Search {
    constructor() {
        
    }

    public async search(_search: DTO_Search) {
        let result = new DTO_SearchResult();

        const f = await Flight.findOne({
            origin: _search.origin,
            destination: _search.destination,
        });

        if(f){
            result.flights.push(f);
        }

        if (result.flights) {

            for (let i = 0; i < result.flights.length; i++) {
                const f = result.flights[i];

                let plane = await Plane.findOne({ number: f.planeNumber })

                if (plane) {
                    (await Seat.find({ planeId: plane._id, isTaken: false })).forEach(s => {
                        result.seats.push(s);
                    })
                }

                result.prices = await Price.find({ flightNumber: f.number });

            }
        }

        return result;

    }
}
