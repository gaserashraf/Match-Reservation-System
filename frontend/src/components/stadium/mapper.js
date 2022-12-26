export const stadiumMapper = (stadium) => {
  let stadiumRet = {
    stadium_name: stadium.name,
    number_of_rows: stadium.rows,
    number_of_seats_per_row: stadium.seatsPerRow,
  };
  return stadiumRet;
};
export const stadiumMapperTo = (stadium) => {
  let stadiumRet = {
    name: stadium.stadium_name,
    rows: parseInt(stadium.number_of_rows),
    seatsPerRow: parseInt(stadium.number_of_seats_per_row),
  };
  return stadiumRet;
};