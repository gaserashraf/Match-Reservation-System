import React, { useContext } from "react";
import UserCard from "./UserCard";
import { handleAccpetNewUser, handleRejectNewUser } from "./Service";
import { AlertContext } from "../../contexts/AlertContext";
const NewUsers = () => {
  const alertContext = useContext(AlertContext);

  let users = [
    {
      name: "Gaser",
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

  const handleOk = (user) => {
    if (handleAccpetNewUser(user)) {
      alertContext.setAlert(
        "user has been accepted",
        "fas fa-times",
        "success"
      );
    } else {
      alertContext.setAlert("error in accepting user", "fas fa-times", "error");
    }
  };
  const handleNo = (user) => {
    if (handleRejectNewUser(user)) {
      alertContext.setAlert(
        "user has been rejected",
        "fas fa-times",
        "success"
      );
    } else {
      alertContext.setAlert("error in rejecting user", "fas fa-times", "error");
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
              type="new"
              handleNo={handleNo.bind(this, user)}
              handleOk={handleOk.bind(this, user)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NewUsers;
