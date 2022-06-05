import Chart, { ChartType } from "chart.js/auto";

import { FlightsFetcher } from "./data";

const plotFlightsPerHour = async () => {
  const flights = await FlightsFetcher.fetch();
  let flightsPerHour: { [key: number]: number } = {};
  flights.forEach((flight) => {
    const hour = new Date(flight.scheduledDepartureTime).getHours();
    flightsPerHour[hour] = (flightsPerHour[hour] || 0) + 1;
  });

  const config = {
    type: "bar" as ChartType,
    data: {
      datasets: [{ label: "Flights", data: flightsPerHour }],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Flight frequency per hour",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Scheduled departure hours",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of flights",
          },
        },
      },
    },
  };

  new Chart(
    document.querySelector<HTMLCanvasElement>("#flightsPerHour")!,
    config
  );
};

const plotPasengersPerHour = async () => {
  // TODO: Implement
};

export const plot = async () => {
  await plotFlightsPerHour();
  await plotPasengersPerHour();
};
