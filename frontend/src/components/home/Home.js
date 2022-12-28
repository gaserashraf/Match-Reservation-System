import React from "react";
import CardLink from "../cardLink/CardLink";
const Home = () => {
  return (
    <div>
      <h1 className="mb-5">Welcome to world cup qatar 2022</h1>
      <div className="row justify-content-start">
        <div className="col-md-12 d-flex flex-wrap justify-content-center">
          <CardLink title="Matches" link="Matchs" icon="far fa-futbol" />
          <CardLink title="Stadiums" link="stadiums" icon="fab fa-usps" />
          <CardLink title="Tickets" link="Tickets" icon="fas fa-ticket-alt" />
          <CardLink title="Teams" link="Teams" icon="fab fa-font-awesome-flag" />
          <CardLink title="Referees" link="Referees" icon="fas fa-flag-checkered" />
        </div>
      </div>
    </div>
  );
};

export default Home;
