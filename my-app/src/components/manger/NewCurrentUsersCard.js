import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
const NewCurrentUsersCard = ({ title, description, link }) => {
  return (
    <Link to={link}>
      <Card sx={{ width: 345 }}>
        <CardActionArea className="py-5" style={{ backgroundColor: "#f0f0f0" }}>
          <i class="fas fa-users" style={{ fontSize: 30 }}></i>
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

export default NewCurrentUsersCard;
