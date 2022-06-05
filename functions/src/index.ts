import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";
const corsHandler = cors({ origin: true });

export const getFlights = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    let datetime = new Date(request.query["date"] as string);
    if (isNaN(datetime.getFullYear())) {
      datetime = new Date();
    }
    let date = datetime.toISOString().slice(0, 10);
    axios
      .get(
        `https://www.swedavia.com/services/publicflightsboard/v2/departures/en/ARN/${date}`
      )
      .then((response) => {
        let allFlights = response.data["flights"] || [];
        return allFlights
          .filter((flight: any) => flight["epiTerminal"]["Id"] === "5")
          .map((flight: any) => {
            return {
              destination: flight["arrivalAirportEnglish"],
              flightId: flight["flightId"],
              scheduledDepartureTime: flight["departureTime"]["scheduledUtc"],
            };
          });
      })
      .then((flights_by_hour) => {
        response.set("Cache-Control", "public, max-age=300, s-maxage=600");
        response.json({ data: flights_by_hour });
      })
      .catch(() => response.json({ data: [] }));
  });
});
