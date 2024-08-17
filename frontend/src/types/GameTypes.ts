export type GameTypes = {
    boxscore: Boxscore;
}

export type Boxscore = {
    players: Player[];
    teams: Team[];  // Added teams array
};

export type Player = {
    displayOrder: number;
    statistics: Statistic[];
};

export type Statistic = {
    athletes: Athlete[];
};

export type Athlete = {
    active: boolean;
    atBats: AtBat[];
    athlete: AthleteDetails;
    batOrder: number;
    position: Position;
    starter: boolean;
    stats: string[];
};

export type AtBat = {
    atBatId: string;
    id: string;
    playId: string;
};

export type AthleteDetails = {
    displayName: string;
    guid: string;
    headshot: Headshot;
    hotZones: HotZone[];
    id: string;
    jersey: string;
    links: Link[];
    position: Position;
    positions: Position[];
    shortName: string;
    uid: string;
};

export type Headshot = {
    alt: string;
    href: string;
};

export type HotZone = {
    active: boolean;
    configurationId: number;
    name: string;
    season: number;
    seasonType: number;
    splitTypeId: number;
    zones: Zone[];
};

export type Zone = {
    hits: number;
    yMin: number;
    yMax: number;
    sluggingScore: number;
    zoneId: number;
};

export type Position = {
    displayName: string;
    name: string;
    id: string;
    abbreviation: string;
};

export type Link = {
    href: string;
    rel: string[];
    text: string;
};

export type Team = {
    homeAway: string;
    displayOrder: number;
    details: TeamDetail[];
    team: TeamInfo;
    statistics: TeamStatistic[];
};

export type TeamDetail = {
    stats: string[];
    displayName: string;
    name: string;
};

export type TeamInfo = {
    abbreviation: string;
    alternateColor: string;
    color: string;
    displayName: string;
    id: string;
    location: string;
    logo: string;
    name: string;
    shortDisplayName: string;
    slug: string;
    uid: string;
};

export type TeamStatistic = {
    stats: string[];
    displayName: string;
    name: string;
};