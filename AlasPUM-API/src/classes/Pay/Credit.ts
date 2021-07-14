import Pay from './Pay';
export default class Credit implements Pay {
    constructor() {

    }

    makePay() {
        return 'Paid with credit card';
    }
}