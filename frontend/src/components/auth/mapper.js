export const userMapper = (user) => {
  user.date = new Date(user.date);
  let date =
    user.date.getFullYear() +
    "-" +
    (user.date.getMonth() + 1) +
    "-" +
    user.date.getDate();
  let userRet = {
    first_name: user.firstName,
    last_name: user.lastName,
    birth_date: date,
    gender: user.gender === "Male" ? 0 : 1,
    nationality: user.country,
    role: user.role === "Manager" ? 1 : 2,
    username: user.username,
    email: user.email,
    password: user.password,
  };
  return userRet;
};
export const userMapperTo = (user) => {
  let userRet = {
    name: user.first_name + " " + user.last_name,
    username: user.username,
    date: user.birth_date,
    gender: user.gender === 0 ? "Male" : "Female",
    country: user.nationality,
    role: user.role === 1 ? "Manager" : user.role === 2 ? "Fan" : "Admin",
    email: user.email,
    access_token: user.access_token,
    firstName: user.first_name,
    lastName: user.last_name,
  };
  return userRet;
};
