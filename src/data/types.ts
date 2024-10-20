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

export type EnigmaAction =
    | { type: "SET_INPUT"; payload: string }
    | { type: "SET_OUTPUT"; payload: string }
    | { type: "SET_ROTOR_SETTINGS"; payload: RotorSetting[] }
    | { type: "SET_PLUGBOARD"; payload: PlugboardPair[] }
    | { type: "SET_ACTIVE_LAMP"; payload: string | null }
    | { type: "SET_EXTENDED_MODE"; payload: boolean }
    | { type: "RESET" };
