import {signal} from "@preact/signals-react";
import {RotorSetting, PlugboardPair} from "./data/types";
import {ALPHABET} from "./data/constants";
import {cipher} from "./utils/enigmaHelpers";

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

export function processChar(char: string) {
  if (ALPHABET.includes(char) || char === " ") {
    const cipheredChar = char === " " ? " " : cipher(char, rotorSettings.value, plugboard.value);
    const newInput = input.value + char;
    const newOutput = output.value + cipheredChar;
    setInput(newInput);
    setOutput(newOutput);
    setActiveLamp(cipheredChar.toUpperCase());

    if (char !== " ") {
      const newSettings = [...rotorSettings.value];
      newSettings[0].ringSetting = (newSettings[0].ringSetting + 1) % 26;
      if (newSettings[0].ringSetting === 0) {
        newSettings[1].ringSetting = (newSettings[1].ringSetting + 1) % 26;
        if (newSettings[1].ringSetting === 0) {
          newSettings[2].ringSetting = (newSettings[2].ringSetting + 1) % 26;
        }
      }
      setRotorSettings(newSettings);
    }
  }
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
