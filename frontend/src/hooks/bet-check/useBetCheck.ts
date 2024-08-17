import useMoneylineCheck from "./useMoneylineCheck";
import useSpreadCheck from "./useSpreadCheck";
import useTotalCheck from "./useTotalCheck";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isUpdated: number;
  pickId: number;
  handicap: string | null;
  team: string;
  userId: number;
};

const useBetCheck = (props: BetProps) => {
  const { sport, league, eventId, type, postId, pickId, isUpdated, handicap, team, userId } =
    props;

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
        isUpdated,
        team,
        userId
      });
    case "Runline":
      return useSpreadCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isUpdated,
        handicap: handicap ?? "",
        team
      });
      case "Total":
      return useTotalCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isUpdated,
        handicap: handicap ?? "",
        team

      });

    default:
      return { status: null, loading: false, error: "Unsupported bet type" };
  }
};

export default useBetCheck;
