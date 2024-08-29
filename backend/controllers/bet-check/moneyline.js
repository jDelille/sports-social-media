import axios from "axios";
import { updateWinLossRecord } from "../../utils/betUtils.js";

export const checkMoneyline = async (req, res) => {
  try {
    const {
      sport,
      league,
      eventId,
      type,
      postId,
      pickId,
      team,
      userId,
      betId,
    } = req.body;

    // Fetching data from ESPN API
    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
    );

    const games = response.data.events;

    const game = games.find((game) => game.id === eventId);

    if (!game) {
      return;
    }

    const status = game.status.type;

    if (!status.completed) {
      return res.status(200).json({ message: "Game not completed yet." });
    }

    const { competitors } = game.competitions[0];
    const [homeTeam, awayTeam] = competitors;
    const homeScore = parseInt(homeTeam.score);
    const awayScore = parseInt(awayTeam.score);

    const isHomeTeam = team === homeTeam.team.displayName;
    const isHomeMoneylineWinner = homeScore > awayScore;
    const result = isHomeTeam ? isHomeMoneylineWinner : !isHomeMoneylineWinner;

    // Use the reusable function to handle win/loss updates
    updateWinLossRecord(userId, result, pickId, postId, homeScore, awayScore, res, betId);
  } catch (error) {
    console.error("Error fetching moneyline data:", error);
    return res
      .status(500)
      .json({ error: "Error fetching moneyline data", error });
  }
};
