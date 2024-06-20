import axios from "axios";

export const getOdds = async (req, res) => {
    const {sport, league} = req.params
    try {
        const response = await axios.get(`https://www.bovada.lv/services/sports/event/coupon/events/A/description/${sport}/${league}`);
        res.json(response.data[0].events);
    } catch (error) {
        console.error('Error fetching odds data:', error);
        res.status(500).send('Error fetching odds data');
    }
}