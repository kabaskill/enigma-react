// EnigmaContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { EnigmaState, EnigmaAction } from "../../data/types";

const initialState: EnigmaState = {
    input: "",
    output: "",
    rotorSettings: [
        { rotor: "I", ringSetting: 0 },
        { rotor: "II", ringSetting: 0 },
        { rotor: "III", ringSetting: 0 },
    ],
    plugboard: [],
    activeLamp: null,
    extendedMode: false,
};

const EnigmaContext = createContext<
    | {
          state: EnigmaState;
          dispatch: React.Dispatch<EnigmaAction>;
      }
    | undefined
>(undefined);

function enigmaReducer(state: EnigmaState, action: EnigmaAction): EnigmaState {
    switch (action.type) {
        case "SET_INPUT":
            return { ...state, input: action.payload };
        case "SET_OUTPUT":
            return { ...state, output: action.payload };
        case "SET_ROTOR_SETTINGS":
            return { ...state, rotorSettings: action.payload };
        case "SET_PLUGBOARD":
            return { ...state, plugboard: action.payload };
        case "SET_ACTIVE_LAMP":
            return { ...state, activeLamp: action.payload };
        case "SET_EXTENDED_MODE":
            return { ...state, extendedMode: action.payload };
        case "RESET":
            return {
                ...initialState,
                rotorSettings: [
                    { rotor: "I", ringSetting: 0 },
                    { rotor: "II", ringSetting: 0 },
                    { rotor: "III", ringSetting: 0 },
                ],
            };
        default:
            return state;
    }
}

export function EnigmaProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(enigmaReducer, initialState);
    return <EnigmaContext.Provider value={{ state, dispatch }}>{children}</EnigmaContext.Provider>;
}

export function useEnigma() {
    const context = useContext(EnigmaContext);
    if (context === undefined) {
        throw new Error("useEnigma must be used within an EnigmaProvider");
    }
    return context;
}
