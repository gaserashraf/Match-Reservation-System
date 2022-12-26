import React, { useContext, useEffect } from "react";
import UserCard from "./UserCard";
import { AlertContext } from "../../contexts/AlertContext";
import { handelDeleteUser, getCurrentUsers } from "./Service";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const CurrentUsers = () => {
  const alertContext = useContext(AlertContext);
  let [users, setUsers] = React.useState([]);
  let [loading, setLoading] = React.useState(true);
  // let usersArr = [
  //   {
  //     name: "Gaser Ashraf",
  //     username: "twix",
  //     city: "giza",
  //     email: "gaser@gmail.com",
  //     gender: "male",
  //     role: "manger",
  //     birthday: "1-11-2000",
  //   },
  //   {
  //     name: "Gaser Ashraf",
  //     username: "twix",
  //     city: "giza",
  //     email: "gaser@gmail.com",
  //     gender: "male",
  //     role: "manger",
  //     birthday: "1-11-2000",
  //   },
  //   {
  //     name: "Gaser Ashraf",
  //     username: "twix",
  //     city: "giza",
  //     email: "gaser@gmail.com",
  //     gender: "male",
  //     role: "manger",
  //     birthday: "1-11-2000",
  //   },
  //   {
  //     name: "Gaser Ashraf",
  //     username: "twix",
  //     city: "giza",
  //     email: "gaser@gmail.com",
  //     gender: "male",
  //     role: "manger",
  //     birthday: "1-11-2000",
  //   },
  //   {
  //     name: "Gaser Ashraf",
  //     username: "twix",
  //     city: "giza",
  //     email: "gaser@gmail.com",
  //     gender: "male",
  //     role: "manger",
  //     birthday: "1-11-2000",
  //   },
  // ];
  useEffect(() => {
    getCurrentUsers(setUsers);
    console.log("curr");
  }, []);

  const handleNo = (user) => {
    handelDeleteUser(user, alertContext, setUsers, users);
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
