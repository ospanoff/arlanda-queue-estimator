import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const getFlights = httpsCallable(functions, "getFlights");

interface Flight {
  destination: string;
  flightId: string;
  scheduledDepartureTime: string;
}

export class FlightsFetcher {
  private static data: Flight[];
  static async fetch(): Promise<Flight[]> {
    if (this.data === undefined) {
      const response = await getFlights();
      this.data = response.data as Flight[];
    }
    return this.data;
  }
}
