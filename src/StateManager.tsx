import {signal} from "@preact/signals-react";
import {RotorSetting} from "./data/types";
import {ALPHABET} from "./data/constants";
import {cipher} from "./utils/enigmaHelpers";

export const input = signal("");
export const output = signal("");
export const rotorSettings = signal<RotorSetting[]>([
  {rotor: "I", ringSetting: 0},
  {rotor: "II", ringSetting: 0},
  {rotor: "III", ringSetting: 0},
]);
export const activeLamp = signal<string | null>(null);
export const controls = signal({
  rotors: {show: true, active: true},
  reflector: {show: true, active: true},
  plugboard: {show: true, active: true},
  lampboard: {show: true, active: true},
  keyboard: {show: true, active: true},
  input: {show: true, active: true},
  output: {show: true, active: true},
});

const defaultPlugboardMapping: Record<string, string> = {};

ALPHABET.split("").forEach((letter) => {
  defaultPlugboardMapping[letter] = letter;
});

export const plugboardMapping = signal<Record<string, string>>(defaultPlugboardMapping);

export function connectPlugboardPair(letter1: string, letter2: string) {
  const newMapping = {...plugboardMapping.value};

  const oldConnection1 = newMapping[letter1];
  const oldConnection2 = newMapping[letter2];

  if (oldConnection1 !== letter1) {
    newMapping[oldConnection1] = oldConnection1;
  }

  if (oldConnection2 !== letter2) {
    newMapping[oldConnection2] = oldConnection2;
  }

  newMapping[letter1] = letter2;
  newMapping[letter2] = letter1;

  plugboardMapping.value = newMapping;
}

export function disconnectPlugboardLetter(letter: string) {
  const newMapping = {...plugboardMapping.value};
  const connectedTo = newMapping[letter];

  newMapping[letter] = letter;
  newMapping[connectedTo] = connectedTo;

  plugboardMapping.value = newMapping;
}

export function resetPlugboard() {
  plugboardMapping.value = {...defaultPlugboardMapping};
}

export function getPlugboardSubstitution(letter: string): string {
  return plugboardMapping.value[letter] || letter;
}

export function setInput(value: string) {
  input.value = value;
}

export function setOutput(value: string) {
  output.value = value;
}

export function setRotorSettings(settings: RotorSetting[]) {
  rotorSettings.value = settings;
}

export function setActiveLamp(lamp: string | null) {
  activeLamp.value = lamp;
}

export function processChar(character: string) {
  const char = character.toUpperCase();
  if (ALPHABET.includes(char) || char === " ") {
    const plugboardPairs = Object.entries(plugboardMapping.value)
      .filter(([key, value]) => key < value) 
      .map(([from, to]) => ({from, to}));

    const cipheredChar = char === " " ? " " : cipher(char, rotorSettings.value, plugboardPairs);
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
  plugboardMapping.value = {...defaultPlugboardMapping};
  activeLamp.value = null;
  controls.value = {
    rotors: {show: true, active: true},
    reflector: {show: true, active: true},
    plugboard: {show: true, active: true},
    lampboard: {show: true, active: true},
    keyboard: {show: true, active: true},
    input: {show: true, active: true},
    output: {show: true, active: true},
  };
}
