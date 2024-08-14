import axios from "axios";
import { db } from "../../connect.js";

export const checkMoneyline = async (req, res) => {
    try {
        const { sport, league, eventId, type, postId, pickId} = req.params;
        
        // Fetching data from ESPN API
        const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`);
        const games = response.data.events;

        // Find the game by eventId
        const game = games.find(game => game.id === eventId);

        // If game not found, return 404
        if (!game) {
            return res.status(404).json({ error: "Game not found." });
        }

        // Get game status
        const status = game.status.type

        // Return if game not completed
        if(!status.completed) {
            return res.status(200).json({ message: "Game not completed yet." });
        }

        // Extract competitors and scores
        const { competitors } = game.competitions[0];
        const [homeTeam, awayTeam] = competitors;
        const homeScore = parseInt(homeTeam.score);
        const awayScore = parseInt(awayTeam.score);

        const isHomeTeam = type === homeTeam.team.displayName;
        
        const isHomeMoneylineWinner = homeScore > awayScore;

        const result = isHomeTeam ? isHomeMoneylineWinner : !isHomeMoneylineWinner;

        const betStatus = result ? 1 : 0;

        const updateBetQuery = `
        UPDATE posts 
        SET bet = JSON_SET(bet, '$.picks[${pickId}].betStatus', ?) 
        WHERE id = ?
    `;

        db.query(updateBetQuery, [betStatus, postId], (err, data) => {
            if (err) {
                console.error('Error updating bet status:', err);
                return res.status(500).json({ error: 'Error updating bet status' });
            }
            // Send the result response after the database update
            return res.status(200).json({ result });
        });

    } catch (error) {
        console.error('Error fetching moneyline data:', error);
        return res.status(500).json({ error: 'Error fetching moneyline data' });
    }
};