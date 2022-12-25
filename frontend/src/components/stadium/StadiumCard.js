import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';
import img from "./stadium.jpg";

const StadiumCard = ({ name, numberOfSeats }) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt="green iguana"
      />
      <CardContent
        className="py-2"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        <CardContent className="pb-0">
          <h5 variant="h5" component="div">
            {name}
          </h5>
          <h5 variant="h6" component="div">
          <i className="fas fa-couch mr-2" style={{color:'green'}}></i>
            {numberOfSeats}
            {" Seats"}
          
          </h5>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default StadiumCard;
