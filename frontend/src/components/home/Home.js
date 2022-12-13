import React from "react";
import CardLink from "../cardLink/CardLink";const Home = () => {
  return (
    <div>
      <h1 className="mb-5">Welcome to world cup qatar 2022</h1>
      <div className="row justify-content-center">
        <div className="col-md-12 d-flex flex-wrap justify-content-between">
          <CardLink title="Matches" link="Matchs" icon="far fa-futbol" />
          <CardLink title="Stadiums" link="Matchs" icon="fab fa-usps" />
          <CardLink title="Tickets" link="Tickets" icon="fas fa-ticket-alt"/>

        </div>
      </div>
    </div>
  );};

export default Home;
