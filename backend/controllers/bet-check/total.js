import axios from "axios";
import { updateWinLossRecord } from "../../utils/betUtils.js";

export const checkTotal = async (req, res) => {
  try {
    const { sport, league, eventId, type, postId, pickId, total, handicap, userId } = req.params;

    // Fetching data from ESPN API
    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
    );
    const games = response.data.events;

    // Find the game by eventId
    const game = games.find((game) => game.id === eventId);

    // If game not found, return 404
    if (!game) {
      return;
    }

    // Get game status
    const status = game.status.type;

    // Return if game not completed
    if (!status.completed) {
      return res.status(200).json({ message: "Game not completed yet." });
    }

    // Extract competitors and scores
    const { competitors } = game.competitions[0];
    const [homeTeam, awayTeam] = competitors;
    const homeScore = parseInt(homeTeam.score);
    const awayScore = parseInt(awayTeam.score);
    const totalScore = homeScore + awayScore;

    const totalInt = parseFloat(handicap);

    let result;

    if (total === "Over") {
      result = totalScore > totalInt ? true : false;
    } else {
      result = totalScore < totalInt ? true : false;
    }

    // Use the reusable function to handle win/loss updates
    updateWinLossRecord(userId, result, pickId, postId, homeScore, awayScore, res);
  } catch (error) {
    console.error("Error fetching total (over/under) data:", error);
    return res.status(500).json({ error: "Error fetching total (over/under) data" });
  }
};