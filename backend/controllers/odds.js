import axios from "axios";

export const getOdds = async (req, res) => {
    // const { id } = req.params;
    try {
        const response = await axios.get(`https://www.bovada.lv/services/sports/event/coupon/events/A/description/baseball/mlb`);
        res.json(response.data[0].events);
    } catch (error) {
        console.error('Error fetching odds data:', error);
        res.status(500).send('Error fetching odds data');
    }
}