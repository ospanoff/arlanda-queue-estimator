import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const getFlights = httpsCallable(functions, "getFlights");

if (import.meta.env.VITE_USE_LOCAL_CLOUD_FUNCTIONS === "true") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

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
