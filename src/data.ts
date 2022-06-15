import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";

import { functions } from "./firebase";

const getFlights = httpsCallable(functions, "getFlights");

if (import.meta.env.VITE_USE_LOCAL_CLOUD_FUNCTIONS === "true") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export interface Flight {
  destination: string;
  flightId: string;
  scheduledDepartureTime: string;
  terminal: string;
}

export class FlightsFetcher {
  private static data: { [date: string]: Flight[] } = {};
  static async fetch(date: string): Promise<Flight[]> {
    if (this.data[date] === undefined) {
      const response = await getFlights({ date: date });
      this.data[date] = response.data as Flight[];
    }
    return this.data[date];
  }
}
