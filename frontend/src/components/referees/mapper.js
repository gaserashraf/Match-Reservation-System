export const refereeMapperTo = (referee) => {
  let refereeRet = {
    refereeId: referee.referee_id,
    refereeName: referee.referee_name,
    refereeEmail: referee.referee_email,
  };
  return refereeRet;
};
