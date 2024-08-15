import axios from "axios";
import { db } from "../../connect.js";

export const checkTotal = async (req, res) => {
  try {
    const { sport, league, eventId, type, postId, pickId, total, handicap } =
      req.params;

    // Fetching data from ESPN API
    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
    );
    const games = response.data.events;

    // Find the game by eventId
    const game = games.find((game) => game.id === eventId);
    
    // If game not found, return 404
    if (!game) {
      return res.status(404).json({ error: "Game not found." });
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

    let score;
    let result;

    if (total === "Over") {
      if (totalScore > totalInt) {
        result = 1;
      } else {
        result = 0;
      }
    } else {
      if (totalScore < totalInt) {
        result = 1;
      } else {
        result = 0;
      }
    }

    const betStatus = result;

    const updateBetQuery = `
    UPDATE posts 
    SET bet = JSON_SET(bet, '$.picks[${pickId}].betStatus', ?) 
    WHERE id = ?
`;

    db.query(updateBetQuery, [betStatus, postId], (err, data) => {
      if (err) {
        console.error("Error updating bet status:", err);
        return res.status(500).json({ error: "Error updating bet status" });
      }
      // Send the result response after the database update
      return res.status(200).json({ result });
    });
  } catch (error) {
    console.error("Error fetching total (over / under) data:", error);
    return res.status(500).json({ error: "Error fetching total (over / under) data" });
  }
};
