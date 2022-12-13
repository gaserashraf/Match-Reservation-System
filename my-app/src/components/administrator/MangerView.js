import React from "react";
import CardLink from "../cardLink/CardLink";
const MangerView = () => {
  return (
    <div>
      <h1 className="mb-5">User Mangement</h1>
      <div className="row justify-content-center">
        <div className="col-md-12 d-flex flex-wrap justify-content-between">
          <CardLink
            title="New users requests"
            link="newusers"
            icon="fas fa-users"
          />
          <CardLink
            title="Current users"
            link="currentusers"
            icon="fas fa-users"
          />
        </div>
      </div>
    </div>
  );
};

export default MangerView;
