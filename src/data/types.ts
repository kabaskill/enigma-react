export interface RotorSetting {
  rotor: string;
  ringSetting: number;
}

export interface Controls {
  rotors: Control;
  plugboard: Control;
  lampboard: Control;
  keyboard: Control;
  input: Control;
  output: Control;
}

export interface Control {
  show: boolean;
  active: boolean;
}
