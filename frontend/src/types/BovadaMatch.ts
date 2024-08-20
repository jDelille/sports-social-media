import { EspnMatch } from "./EspnMatch";

type Market = {
    description: string;
    descriptionKey: string;
    id: string;
    key: string;
    marketTypeId: string;
    notes: string;
    outcomes: Outcome[];
    period: {
        description: string;
    }
};

type Outcome = {
    description: string;
    id: string;
    price: Price;
    status: string;
    type: string;
};

export type Price = {
    american: string;
    decimal: string;
    fractional: string;
    hongkong: string;
    id: string;
    indonesian: string;
    malay: string;
    handicap: string;
};

export type DisplayGroup = {
    id: string;
    description: string;
    defaultType: boolean;
    alternateType: boolean;
    markets: Market[]; 
};

type BovadaMatchTypes = {
    availableSGP: boolean;
    description: string;
    id: string;
    date: string;
    live: boolean;
    displayGroups: DisplayGroup[];
    espnMatch: EspnMatch;
};

export default BovadaMatchTypes;