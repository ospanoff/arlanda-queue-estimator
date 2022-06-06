import "./style.css";

import { plot } from "./plot";

declare global {
  interface Window {
    plot: Function;
  }
}

window.plot = plot;

let dateInput = document.querySelector<HTMLInputElement>("#flightsDate")!;
dateInput.value = new Date().toISOString().slice(0, 10);
dateInput.dispatchEvent(new Event("change"));
