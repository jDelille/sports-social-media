
import axios from "axios";

export const getESPNData = async (req, res) => {
    const {sport, league} = req.params
    try {
        const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching ESPN data:', error);
        res.status(500).send('Error fetching ESPN data');
    }
}