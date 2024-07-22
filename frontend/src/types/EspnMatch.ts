export type Team = {
    abbreviation: string;
    alternateColor: string;
    color: string;
    displayName: string;
    id: string;
    isActive: boolean;
    links: { href: string }[];
    location: string;
    logo: string;
    name: string;
    shortDisplayName: string;
    uid: string;
  };
  
  export type Competitor = {
    errors: number;
    hits: number;
    homeAway: string;
    id: string;
    leaders: any[]; 
    linescores: any[]; 
    order: number;
    probables: any[]; 
    records: any[]; 
    score: string;
    statistics: any[]; 
    team: Team;
  };
  
  export type Competition = {
    attendance: number;
    broadcasts: any[]; 
    competitors: Competitor[];
    conferenceCompetition: boolean;
    date: string;
    format: { regulation: any }; 
    geoBroadcasts: any[]; 
  };

  export type Status = {
    clock: number;
    displayClock: string;
    period: number;
    type : {
        id: string;
        completed: boolean;
        description: string;
        detail: string;
        name: string;
        shortDetail: string;
        state: string;
    }
  }
  
  export type EspnMatch = {
    competitions: Competition[];
    status: Status;
  };