import Chart, { ChartType } from "chart.js/auto";

import { FlightsFetcher } from "./data";

let charts: any[] = [];

const plotFlightsPerHour = async (date: string, terminal: string = "5") => {
  const flights = (await FlightsFetcher.fetch(date)).filter(
    (flight) => flight.terminal === terminal
  );
  let flightsPerHour: { [key: number]: number } = {};
  flights.forEach((flight) => {
    const hour = new Date(flight.scheduledDepartureTime).getHours();
    flightsPerHour[hour] = (flightsPerHour[hour] || 0) + 1;
  });

  const config = {
    type: "bar" as ChartType,
    data: {
      datasets: [
        {
          label: "Flights",
          data: flightsPerHour,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Flight frequency per hour (Terminal ${terminal})`,
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

  charts.push(
    new Chart(
      document.querySelector<HTMLCanvasElement>(`#flightsPerHourT${terminal}`)!,
      config
    )
  );
};

const plotPasengersPerHour = async () => {
  // TODO: Implement
};

export const destroyCharts = () => {
  charts.forEach((chart) => chart.destroy());
  charts = [];
};

export const plot = async (date?: string) => {
  destroyCharts();
  if (date === undefined) {
    date = new Date().toISOString().slice(0, 10);
  }
  await plotFlightsPerHour(date, "5");
  await plotFlightsPerHour(date, "2");
  await plotPasengersPerHour();
};
