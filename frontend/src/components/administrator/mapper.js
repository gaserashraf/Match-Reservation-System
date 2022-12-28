export const userMapperTo = (user) => {
  let userRet = {
    name: user.first_name + " " + user.last_name,
    username: user.username,
    birthday: user.birth_date,
    gender: user.gender === false ? "Male" : "Female",
    city: user.nationality,
    role: user.role === 1 ? "Manager" : "Fan",
    email: user.email,
  };
  return userRet;
};
