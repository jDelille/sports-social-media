import React, { useEffect } from "react";
import "./page.scss";
import PageHeader from "../components/page-header/PageHeader";
import { useAxios } from "../hooks";

type MatchesProps = {};
const Matches: React.FC<MatchesProps> = () => {

    useEffect(() => {
        const fetchOdds = async () => {
            try {
                const response = await useAxios.get(`/odds/`);
                const data = await response.data
                console.log(data);
                // Process the data as needed
            } catch (error) {
                console.error('Error fetching odds:', error);
            }
        }

        fetchOdds();

    }, [])

  return (
    <div className="page matches-page">
      <PageHeader title="Matches" />
    </div>
  );
};

export default Matches;
