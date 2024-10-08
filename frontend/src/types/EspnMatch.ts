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

  export type Headlines = {
    description: string;
    shortLinkText: string;
    type: string;
    video: {
      headline: string;
      source: string;
      thumbnail: string;
      links: {
        source: {
          HD: {
            href: string
          }
        }
      }
    }[]
  }

  export type TeamOdds = {
    favorite: boolean;
    underdog: boolean;
    close: {
      pointSpread: {
        american: string;
      }
    }
  }

  export type OddValues = {
    value: number;
    american: string;
    decimal: number;
  }

  export type OddLines = {
    over: OddValues;
    total: OddValues;
    under: OddValues;
  }

  export type Odds = {
    awayTeamOdds: TeamOdds;
    homeTeamOdds: TeamOdds;
    overUnder: number;
    spread: number;
    current: OddLines;
    open: OddLines;
  }
  
  export type Competition = {
    attendance: number;
    broadcasts: any[]; 
    competitors: Competitor[];
    conferenceCompetition: boolean;
    date: string;
    format: { regulation: any }; 
    geoBroadcasts: any[]; 
    headlines: Headlines[];
    odds: Odds[];
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
    shortName: string;
    id: string;
    boxscore: any;
  };