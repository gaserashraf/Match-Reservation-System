import React, { useContext } from "react";
import UserCard from "./UserCard";
import { AlertContext } from "../../contexts/AlertContext";
import { handelDeleteUser } from "./Service";
const CurrentUsers = () => {
  const alertContext = useContext(AlertContext);

  let users = [
    {
      name: "Gaser Ashraf",
      username: "twix",
      city: "giza",
      email: "gaser@gmail.com",
      gender: "male",
      role: "manger",
      birthday: "1-11-2000",
    },
    {
      name: "Gaser Ashraf",
      username: "twix",
      city: "giza",
      email: "gaser@gmail.com",
      gender: "male",
      role: "manger",
      birthday: "1-11-2000",
    },
    {
      name: "Gaser Ashraf",
      username: "twix",
      city: "giza",
      email: "gaser@gmail.com",
      gender: "male",
      role: "manger",
      birthday: "1-11-2000",
    },
    {
      name: "Gaser Ashraf",
      username: "twix",
      city: "giza",
      email: "gaser@gmail.com",
      gender: "male",
      role: "manger",
      birthday: "1-11-2000",
    },
    {
      name: "Gaser Ashraf",
      username: "twix",
      city: "giza",
      email: "gaser@gmail.com",
      gender: "male",
      role: "manger",
      birthday: "1-11-2000",
    },
  ];
  const handleNo = (user) => {
    if (handelDeleteUser(user)) {
      alertContext.setAlert("user has been deleted", "success");
    } else {
      alertContext.setAlert("user has not been deleted", "error");
    }
  };

  return (
    <div className="row mt-2">
      {users.map((user) => {
        return (
          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <UserCard
              name={user.name}
              username={user.username}
              city={user.city}
              email={user.email}
              gender={user.gender}
              role={user.role}
              birthday={user.birthday}
              type="current"
              handleNo={handleNo.bind(this, user)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CurrentUsers;
