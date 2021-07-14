import { IFlight } from "../models/flights/Flight";
import moment from 'moment';


export const generateEmail = (passengers: string | any[], flight: IFlight | null, targetDate: any) => {

  let htmlTop = `
  <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>

  <html xmlns=“https://www.w3.org/1999/xhtml”>
  
  <head>
  
  <title>Boarding Passages</title>
  
  <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />
  
  <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />
  
  <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />


<table>
`
if (flight) {

  for (let i = 0; i < passengers.length; i++) {
    console.log("Passengers desde email" + passengers);
    console.log(passengers.length);
    const element = passengers[i];
    let ticket = `
    <tr>
      <div class="ticket">
        <div class="ticket-header">
          <div class="ticket-departure">
            <span class="city-name">${flight.origin}</span>
          </div><svg class="separator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1" x="0px" y="0px" viewbox="0 0 510 510" style="enable-background:new 0 0 510 510;"
            xml:space="preserve">
            <g id="flights"></g>
            <path
              d="M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25    l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z"
              fill="currentColor"></path>
          </svg>
          <div class="ticket-destination">
            <span class="city-name">${flight.destination}</span>
          </div>
        </div>
        <div class="ticket-body">
          <div class="row">
            <div class="col half">
              <div class="row-vertical">
                <div class="col">
                  <div class="item">
                    <h2 class="name">Passenger</h2><span class="value">${element.fullName}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="item">
                    <h2 class="name">Flight</h2><span class="value">${flight.number}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="item">
                    <h2 class="name">Departure</h2><span class="value">${moment(targetDate).format('DD/MM/YYYY') + ' - ' + moment(flight.departureDate).format('HH:MM')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col half"><img class="ticket-qrcode"
                src="https://1.bp.blogspot.com/-tWxtTHsnBvQ/Wx0E35ydjVI/AAAAAAAAA6w/SxUTG14Kx8ABJkT4_7S18j4W-Sj5a50YACLcBGAs/s1600/qr.png"
                alt="Ticket Code" /></div>
          </div>
        </div>
      </div>
    </tr>
        `
        htmlTop += ticket;
  }
}
let htmlBottom = `
</table>
<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700,900');

    * {
      box-sizing: border-box;
    }

    *::before,
    *::after {
      box-sizing: border-box;
    }
    img {
      height: auto;
      width: 100%;
    }
    .ticket {
      background: #fff;
      border-radius: 4px;
      color: #0b1521;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      padding: 30px;
      margin: 80px auto;
      max-width: 400px;
    }

    .ticket-header {
      display: flex;
      justify-content: space-between;
      margin: 20px 0 50px 0;
      position: relative;
    }

    .ticket-header>svg.separator {
      animation: flight 2s infinite;
      display: block;
      color: #d3e6f4;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
    }

    .ticket-departure {
      text-align: left;
    }

    .ticket-destination {
      text-align: right;
    }

    .ticket .city-abbr {
      color: #3b8acf;
      font-size: 45px;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 50px;
      margin: 0;
      text-transform: uppercase;
    }

    .ticket .city-name {
      color: #aaaaac;
      font-size: 16px;
      text-transform: uppercase;
    }

    .ticket .item:not(:last-child) {
      margin-bottom: 20px;
    }

    .ticket .name {
      color: #aaaaac;
      font-size: 12px;
      font-weight: normal;
      line-height: 20px;
      margin: 0;
      text-transform: uppercase;
    }

    .ticket .value {
      color: #000;
      font-size: 16px;
      line-height: 20px;
    }

    .row {
      display: flex;
      flex-direction: row;
    }

    .row-vertical {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
    }

    .row-vertical>.col {
      flex: 0;
    }

    .row>.col {
      flex: 1;
    }

    .row>.col.half {
      flex-basis: 50%;
    }
  </style>
  </head>`
let html = htmlTop + htmlBottom
return html
}