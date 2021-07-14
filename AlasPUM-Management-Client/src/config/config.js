const APIport = 8080;
const APIBaseUrl = `http://localhost:${APIport}`;
const WSBaseURL = 'ws://localhost:9090'
export default {
    API: {
        SignIn: APIBaseUrl + '/auth/signin',
        SignUp: APIBaseUrl + '/auth/signup',

        GetAllPlanes: APIBaseUrl + '/planes',
        AddPlaneWithSeats : APIBaseUrl + '/planes',
        UpdatePlane: APIBaseUrl + '/planes',
        DeletePlane: APIBaseUrl + '/planes/logicDelete',
        GetQuantitySeatsByPlaneId: APIBaseUrl + '/getQuantityByPlaneID',

        AddFlight: APIBaseUrl + '/flights',
        GetAllFlights: APIBaseUrl + '/flights',
        DeleteFlight: APIBaseUrl + '/flights/logicDelete',
        AddPrices: APIBaseUrl + '/prices',
        GetPricesByFlightNumber: APIBaseUrl + '/prices',
        
        GetAllPurchases: APIBaseUrl + '/purchases',

        Reports: APIBaseUrl + '/reports'
    },
    WebSocket: {
        baseUrl:WSBaseURL
    }
}