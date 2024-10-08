import useMoneylineCheck from "./useMoneylineCheck";
import useSpreadCheck from "./useSpreadCheck";
import useTotalCheck from "./useTotalCheck";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isWinner: number;
  pickId: number;
  handicap: string | null;
  team: string;
  userId: number;
  betId: number;
  status: string;
};

const useBetCheck = (props: BetProps) => {
  const { sport, league, eventId, type, postId, pickId, isWinner, handicap, team, userId, betId, status } =
    props;

    if(status === 'completed') {
      return;
    }

  // Determine which hook to call based on the bet type
  switch (props.type) {
    case "Moneyline":
      return useMoneylineCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isWinner,
        team,
        userId,
        betId,
        status
      });
    case "Runline":
    case "Point Spread":
      return useSpreadCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isWinner,
        handicap: handicap ?? "",
        team,
        userId,
        betId,
      });
      case "Total":
      return useTotalCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isWinner,
        handicap: handicap ?? "",
        team

      });

    default:
      return { status: null, loading: false, error: "Unsupported bet type" };
  }
};

export default useBetCheck;
