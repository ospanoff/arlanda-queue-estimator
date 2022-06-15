import Chart, { ChartType } from "chart.js/auto";

import { Flight, FlightsFetcher } from "./data";

let charts: any[] = [];

const plotFlightsPerHour = async (
  allFlights: Flight[],
  terminal: string = "5"
) => {
  const flights = allFlights.filter((flight) => flight.terminal === terminal);
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

  charts.push(new Chart(createCanvas(), config));
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");

  const chartDiv = document.createElement("div");
  chartDiv.className = "w-full md:w-1/2 md:p-5";
  chartDiv.appendChild(canvas);

  const chartsDiv = document.querySelector<HTMLDivElement>(`#charts`)!;
  chartsDiv.appendChild(chartDiv);

  return canvas;
};

const destroyCanvases = () => {
  const chartsDiv = document.querySelector<HTMLDivElement>(`#charts`)!;
  chartsDiv.textContent = "";
};

const destroyCharts = () => {
  charts.forEach((chart) => chart.destroy());
  charts.length = 0;
  destroyCanvases();
};

export const plot = async (date?: string) => {
  destroyCharts();
  if (date === undefined) {
    date = new Date().toISOString().slice(0, 10);
  }
  const flights = await FlightsFetcher.fetch(date);
  const uniqTerminals = new Set(flights.map((flight) => flight.terminal));
  uniqTerminals.delete("5");
  const terminals = Array.from(uniqTerminals).sort();
  ["5", ...terminals].forEach(
    async (terminal) => await plotFlightsPerHour(flights, terminal)
  );
};
