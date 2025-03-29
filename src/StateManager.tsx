import {signal} from "@preact/signals-react";
import {RotorSetting, PlugboardPair} from "./data/types";

export const input = signal("");
export const output = signal("");
export const rotorSettings = signal<RotorSetting[]>([
  {rotor: "I", ringSetting: 0},
  {rotor: "II", ringSetting: 0},
  {rotor: "III", ringSetting: 0},
]);
export const plugboard = signal<PlugboardPair[]>([]);
export const activeLamp = signal<string | null>(null);

// Actions (functions that modify signals)
export function setInput(value: string) {
  input.value = value;
}

export function setOutput(value: string) {
  output.value = value;
}

export function setRotorSettings(settings: RotorSetting[]) {
  rotorSettings.value = settings;
}

export function setPlugboard(pairs: PlugboardPair[]) {
  plugboard.value = pairs;
}

export function setActiveLamp(lamp: string | null) {
  activeLamp.value = lamp;
}

export function reset() {
  input.value = "";
  output.value = "";
  rotorSettings.value = [
    {rotor: "I", ringSetting: 0},
    {rotor: "II", ringSetting: 0},
    {rotor: "III", ringSetting: 0},
  ];
  plugboard.value = [];
  activeLamp.value = null;
}
