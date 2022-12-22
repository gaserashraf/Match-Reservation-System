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
        style={{ backgroundColor: "#f0f0f0", position: "relative" }}
      >
        <CardContent className="pb-0">
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h6" component="div">
            {numberOfSeats}
            {" Seats"}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default StadiumCard;
