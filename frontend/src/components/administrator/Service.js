import Axios from "axios";
import apiBaseUrl from "../../config.json";
import { userMapperTo } from "./mapper";
export const getNewUsers = (setUsers) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/admin/users/new`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      let users = res?.data?.response?.users;
      let usersRet = [];
      users.forEach((user) => {
        usersRet.push(userMapperTo(user));
      });
      setUsers(usersRet);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
    });
};
export const getCurrentUsers = (setUsers) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/admin/users/current`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      let users = res?.data?.response?.users;
      console.log(users);
      let usersRet = [];
      users.forEach((user) => {
        usersRet.push(userMapperTo(user));
      });
      setUsers(usersRet);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
    });
};

export const handleAccpetNewUser = (user, alertContext, setUsers, users) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  let username = user.username;
  Axios({
    method: "PUT",
    url: `${apiBaseUrl.apiBaseUrl}/admin/allow/${username}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then(() => {
      alertContext.setAlert("user has been accepted", "success");
      setUsers(users.filter((u) => u.username !== username));
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("error in accepting user", "error");
    });
};

export const handelDeleteUser = (user, alertContext, setUsers, users) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  let username = user.username;
  Axios({
    method: "DELETE",
    url: `${apiBaseUrl.apiBaseUrl}/admin/delete/${username}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then(() => {
      alertContext.setAlert("user has been deleted", "success");
      setUsers(users.filter((u) => u.username !== username));
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("error in deleting user", "error");
    });
};
