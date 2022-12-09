import React from "react";
import CardLink from "../cardLink/CardLink";
const MangerView = () => {
  return (
    <div>
      <h1 className="mb-5">User Mangement</h1>
      <div className="row justify-content-center">
        <div className="col-md-9 d-flex justify-content-between">
          <CardLink title="New users requests" link={"newusers"} />
          <CardLink title="Current users" link={"currentusers"} />
        </div>
      </div>
    </div>
  );
};

export default MangerView;
