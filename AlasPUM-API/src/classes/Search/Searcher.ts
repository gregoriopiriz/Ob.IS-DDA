import DTO_Search from "../../DTOs/dto_search";
import Search from "./Search";

export default class Searcher {
    
    private strategy: Search

    constructor(_strategy: Search) {
        this.strategy = _strategy;
    }

    public set Strategy(_strategy : Search) {
        this.strategy = _strategy;
    }
    
    
    public get Strategy() : Search {
        return this.strategy
    }
    
    public Search(_search: DTO_Search) {
        return this.strategy.search(_search);
    }

}