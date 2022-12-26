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
        "User registered successfully! Please wait for the admin you accept you",
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
  console.log(email, password);
  const userObj = {
    email: email,
    password: password,
  };
  console.log(userObj);
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
        alertContext.setAlert("Error registering user", "error");
      } else {
        alertContext.setAlert(res, "error");
      }
    });
};

export const handleUpdateProfile = (user, alertContext) => {
  const userObj = userMapper(user);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
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
    .then(() => {
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
