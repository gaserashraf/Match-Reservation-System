import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { getAllTeams } from "./Service.js";
import CustomLoading from "../loading/CustomLoading";
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  useEffect(() => {
    getAllTeams(setTeams, setTeamsLoading);
  }, []);

  return (
    <div>
      <h1 className="mb-5 text-left">Teams</h1>
      <div className="d-flex flex-wrap">
        {teamsLoading && <CustomLoading />}
        {teams.map((teams) => (
          <TeamCard
            key={teams.teamId}
            id={teams.teamId}
            name={teams.teamName}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
