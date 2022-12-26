export const matchMapper = (match) => {
  const current_date =
    match.dateAndTime.getFullYear() +
    "-" +
    (match.dateAndTime.getMonth() + 1) +
    "-" +
    match.dateAndTime.getDate();
  const current_time =
    match.dateAndTime.getHours() + ":" + match.dateAndTime.getMinutes();
  let matchRet = {
    teamA_id: match.teamAId,
    teamB_id: match.teamBId,
    stadium_id: match.stadiumId,
    referee_id: match.refereeId,
    linesManA_id: match.linesManAId,
    linesManB_id: match.linesManBId,
    date: current_date,
    time: current_time,
  };
  return matchRet;
};
export const matchMapperTo = (match) => {
  let matchRet = {
    matchId: match.id,
    teamAId: match.teamA_id[0],
    teamBId: match.teamB_id[0],
    stadiumId: match.stadium_id[0],
    refereeId: match.referee_id[0],
    refereeName: match.referee_name,
    linesManAId: match.linesmanA_id[0],
    linesManBId: match.linesmanB_id[0],
    dateAndTime: new Date(match.date + " " + match.time),
  };
  return matchRet;
};
