import Axios from "axios";
import apiBaseUrl from "../../config.json";
import { userMapper, userMapperTo } from "./mapper";
export const handleRegister = (user, alertContext) => {
  const userObj = userMapper(user);
  Axios({
    method: "POST",
    url: `${apiBaseUrl.apiBaseUrl}/register`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: userObj,
  })
    .then(() => {
      console.log("User registered successfully!");
      alertContext.setAlert(
        "User registered successfully! Please wait for the admin to accept you",
        "success"
      );
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      if (res === undefined) {
        alertContext.setAlert("Error registering user", "error");
      } else {
        alertContext.setAlert(res, "error");
      }
    });
};

export const handleLogin = (email, password, alertContext) => {
  const userObj = {
    email: email,
    password: password,
  };
  Axios({
    method: "POST",
    url: `${apiBaseUrl.apiBaseUrl}/login`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    data: userObj,
  })
    .then((res) => {
      console.log("User login successfully!");
      alertContext.setAlert("User login successfully!", "success");
      let user = res.data.response;
      if (user === undefined) {
        alertContext.setAlert("Please wait the admin allow you", "error");
        return;
      }
      user = userMapperTo(user);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "Admin") {
        window.location.href = "/administrator";
      } else {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.meta?.msg;
      console.log(res);
      if (res === undefined) {
        alertContext.setAlert("Error in login", "error");
      } else {
        alertContext.setAlert(res, "error");
      }
    });
};

export const handleUpdateProfile = (user, alertContext) => {
  const userObj = userMapper(user);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  console.log(userObj);
  console.log(user);
  console.log(userToken);
  console.log("update profile");
  Axios({
    method: "PUT",
    url: `${apiBaseUrl.apiBaseUrl}/update/profile`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    data: userObj,
  })
    .then((res) => {
      let user = res.data.response;
      console.log(res);
      let oldToken = JSON.parse(localStorage.getItem("user")).access_token;

      user = userMapperTo(user);
      user.access_token=oldToken;
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User update profile successfully!");
      alertContext.setAlert("User update profile successfully!", "success");
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      if (res === undefined) {
        alertContext.setAlert("Error in updating profile user", "error");
      } else {
        alertContext.setAlert(res, "error");
      }
    });
};
