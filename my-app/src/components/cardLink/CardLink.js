import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import "./CardLink.css";
const CardLink = ({ title, description, link, icon }) => {
  return (
    <Link to={link} className="mb-2 mr-0 mr-md-2 w-sm-100">
      <Card sx={{ width: 345, margin: 0 }} className="w-sm-100">
        <CardActionArea className="py-5" style={{ backgroundColor: "#f0f0f0" }}>
          <i class={icon} style={{ fontSize: 50 }}></i>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardLink;
