const APIport = 8080;
const APIBaseUrl = `http://localhost:${APIport}`;
export default {
    API: {
        searchFlight: APIBaseUrl + '/search/searchFlight',
        pay: APIBaseUrl + '/pay',

        getFlightById: APIBaseUrl + '/flights',

        createPurchase: APIBaseUrl + '/purchases/createPurchase'
    }
}