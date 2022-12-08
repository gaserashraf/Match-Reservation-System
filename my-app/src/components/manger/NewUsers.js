import React from "react";

import UserCard from "./UserCard";
const NewUsers = () => {
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
      return <div className="row mt-2">
        {users.map((user) => {
            return <div className="col-12 col-md-6 col-lg-4 mb-2">
                <UserCard name={user.name} username={user.username} city={user.city} email = {user.email} gender={user.gender} role={user.role} birthday={user.birthday} type="new" />
            </div>
        })}
        
      </div>;
};

export default NewUsers;
