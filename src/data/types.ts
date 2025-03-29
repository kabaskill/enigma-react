export interface RotorSetting {
    rotor: string;
    ringSetting: number;
}

export interface PlugboardPair {
    from: string;
    to: string;
}

export interface EnigmaState {
    input: string;
    output: string;
    rotorSettings: RotorSetting[];
    plugboard: PlugboardPair[];
    activeLamp: string | null;
    extendedMode: boolean;
}


