import { createContext, useState } from "react";
import React from "react";

export const AlertContext = createContext();

export default function AlertContextProvider(props) {
  const [alerts, setAlerts] = useState([]);
  const { children } = props;

  const setAlert = (msg, severity) => {
    // check if we find the same alert in the array
    const found = alerts.some((alert) => alert.msg === msg);
    if (found) {
      return;
    }
    const id = Math.floor(Math.random() * 1000000);
    setAlerts([...alerts, { msg, severity, id }]);
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };
  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };
  return (
    <AlertContext.Provider value={{ alerts, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
