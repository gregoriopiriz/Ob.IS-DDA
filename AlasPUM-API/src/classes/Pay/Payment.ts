import Pay from "./Pay";

export default class Payment {

    private strategy: Pay;

    constructor(_strategy: Pay) {
        this.strategy = _strategy;
    }

    
    public set Strategy(strategy : Pay) {
        this.strategy = strategy;
    }

    
    public get Strategy() : Pay {
        return this.Strategy;
    }
    
    public Pay(){
        return this.strategy.makePay();
    }

}