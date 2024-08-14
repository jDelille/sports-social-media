import useMoneylineCheck from "./useMoneylineCheck";
import useSpreadCheck from "./useSpreadCheck";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isUpdated: number;
  pickId: number;
  description: string;
  handicap: string | null;
};

const useBetCheck = (props: BetProps) => {
  const { sport, league, eventId, type, postId, pickId, isUpdated, handicap } =
    props;

  // Determine which hook to call based on the bet type
  switch (props.description) {
    case "Moneyline":
      return useMoneylineCheck({
        sport,
        league,
        eventId,
        type,
        postId,
        pickId,
        isUpdated,
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
      });

    default:
      return { status: null, loading: false, error: "Unsupported bet type" };
  }
};

export default useBetCheck;
