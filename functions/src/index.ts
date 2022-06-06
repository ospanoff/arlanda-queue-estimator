import * as functions from "firebase-functions";
import axios from "axios";

export const getFlights = functions
  .region("europe-west1")
  .https.onCall(async (data) => {
    let datetime = new Date(data["date"] as string);
    if (isNaN(datetime.getFullYear())) {
      datetime = new Date();
    }
    let date = datetime.toISOString().slice(0, 10);
    return axios
      .get(
        `https://www.swedavia.com/services/publicflightsboard/v2/departures/en/ARN/${date}`
      )
      .then((response) => {
        let allFlights = response.data["flights"] || [];
        return allFlights.map((flight: any) => ({
          destination: flight["arrivalAirportEnglish"],
          flightId: flight["flightId"],
          scheduledDepartureTime: flight["departureTime"]["scheduledUtc"],
          terminal: flight["epiTerminal"]["Id"],
        }));
      })
      .catch(() => []);
  });
