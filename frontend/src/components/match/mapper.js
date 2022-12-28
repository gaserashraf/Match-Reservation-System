import moment from "moment";

export const matchMapper = (match) => {
  match.dateAndTime = new Date(match.dateAndTime);

  const current_date = match.dateAndTime.toISOString().split("T")[0];
  const current_time = moment(match.dateAndTime).format("HH:mm");

  let matchRet = {
    teamA_id: match?.team1?.teamId,
    teamB_id: match?.team2?.teamId,
    stadium_id: match?.stadium?.id,
    referee_id: match?.mainReferee?.refereeId,
    linesmanA_id: match?.lineReferee1?.refereeId,
    linesmanB_id: match?.lineReferee2?.refereeId,
    date: current_date,
    time: current_time,
  };
  return matchRet;
};
export const matchMapperTo = (match) => {
  let matchRet = {
    matchId: match.id,
    teamAId: match.teamA_id[0].id,
    teamAName: match.teamA_id[0].team_name,
    teamBId: match.teamB_id[0].id,
    teamBName: match.teamB_id[0].team_name,
    stadiumId: match.stadium_id[0].stadium_id,
    stadiumName: match.stadium_id[0].stadium_name,
    stadiumRows: match.stadium_id[0].number_of_rows,
    stadiumNumOfSeatsPerRow: match.stadium_id[0].number_of_seats_per_row,
    refereeId: match.referee_id[0].referee_id,
    refereeName: match.referee_id[0].referee_name,
    linesManAId: match.linesmanA_id[0].referee_id,
    linesManAName: match.linesmanA_id[0].referee_name,
    linesManBId: match.linesmanB_id[0].referee_id,
    linesManBName: match.linesmanB_id[0].referee_name,
    dateAndTime: new Date(match.date + " " + match.time),
  };
  return matchRet;
};
