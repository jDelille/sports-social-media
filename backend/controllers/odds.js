export const getOdds = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://www.bovada.lv/services/sports/event/v2/events/A/description/basketball/nba`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching odds data:', error);
        res.status(500).send('Error fetching odds data');
    }
}