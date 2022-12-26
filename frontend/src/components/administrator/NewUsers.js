import React, { useContext, useEffect } from "react";
import UserCard from "./UserCard";
import { handleAccpetNewUser, getNewUsers, handelDeleteUser } from "./Service";
import { AlertContext } from "../../contexts/AlertContext";
const NewUsers = () => {
  const alertContext = useContext(AlertContext);

  let [users, setUsers] = React.useState([]);
  // let usersArr = [
  //   {
  //     name: "Gaser",
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
    getNewUsers(setUsers);
  }, []);

  const handleOk = (user) => {
    handleAccpetNewUser(user, alertContext, setUsers, users);
  };
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
