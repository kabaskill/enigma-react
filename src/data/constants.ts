export const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const KEYBOARD: {[key: string]: string} = {
  row1: "QWERTZUIO",
  row2: "ASDFGHJK",
  row3: "PYXCVBNML",
};

export const DIGITS: string = "1234567890";

export const SPECIAL_CHARACTERS: string = "!@#$%^&*(){}[]=<>/,.";

export const ROTORS: {[key: string]: string} = {
  I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  V: "VZBRGITYUPSDNHLXAWMJQOFECK",
};

export const REFLECTOR: string = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

export const TOOLTIPS: {[key: string]: string} = {
  header: "This is a recreation of the famous Enigma machine used during World War II.",
  rotors: "Rotors are the heart of the Enigma machine. They scramble the letters based on their wiring.",
  reflector: "The reflector sends the signal back through the rotors, creating a symmetric encryption.",
  plugboard: "The plugboard allows for additional scrambling by swapping pairs of letters.",
  lampboard: "The lampboard shows which letter is currently being outputted.",
  keyboard: "The keyboard is where you input the letters to be encrypted.",
  input: "The input shows the letters you type on the keyboard.",
  output: "The output shows the encrypted letters as you type.",
  settings: "Settings allow you to configure the machine, including rotor positions and plugboard connections.",
};
