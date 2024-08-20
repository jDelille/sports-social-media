import UserTypes from "./User";

type PostTypes = {
    id: number;
    user_id: number;
    body: string;
    type: string;
    name: string;
    username: string;
    user: UserTypes;
    image: string;
    reposter_username: string;
    reposted_post_id: number;
    original_post_body: string;
    quote_reposted_post_id: number;
    quote_reposted_quote_repost_id: number;
    created_at: string;
    original_post_user: {
        id: number;
        name: string;
        username: string;
        avatar: string;
    };
    metadata: {
        url: string;
        title: string;
        site_name: string;
        description: string;
        image: string;
    };
    bet: {
        isWinner: boolean;
        isParlay: boolean;
        picks: {
            id: string;
            matchup: string;
            type: string;
            price: string;
            team: string;
            sport: string;
            league: string;
            eventId: string;
            isWinner: boolean;
            handicap: string | null;
            homeScore: number;
            awayScore: number;
            teams: {
                away: {
                    abbrv: string;
                    logo: string;
                },
                home: {
                    abbrv: string;
                    logo: string;
                }
            }
        }[],
        wager: string;
        payout: string;
   
    }
}

export default PostTypes;