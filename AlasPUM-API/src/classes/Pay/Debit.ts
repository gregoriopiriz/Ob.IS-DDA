import Pay from './Pay';
export default class Debit implements Pay {
    constructor() {

    }

    makePay() {
        return 'Paid with debit card';
    }
}