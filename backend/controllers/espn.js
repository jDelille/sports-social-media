import axios from "axios";

export const getESPNData = async (req, res) => {
  const { sport, league } = req.params;
  try {
    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching ESPN data:", error);
    res.status(500).send("Error fetching ESPN data");
  }
};

export const getGameData = async (req, res) => {
  const { league, gameId } = req.params;

  try {
    const url = `https://cdn.espn.com/core/${league}/game?xhr=1&gameId=${gameId}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching ESPN data:", error);
    res.status(500).send("Error fetching ESPN data");
  }
};
