import React, { useEffect, useState } from "react";
import flag from "../../assets/images/flag.png";

const TeamCard = (props) => {
  let { name } = props;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(
          `../../assets/flags/${name.replace(/ /g, "-").toLowerCase()}.png`
        );
        setImage(response.default);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImage();
  }, []);
  return (
    <div className="mr-3 mb-3">
      <div style={{ width: "100px", height: "63px" }}>
        <img
          src={image ? image : flag}
          alt="flag"
          className="w-100 h-100"
          style={{ border: "2px solid #d5c46c" }}
        />
      </div>
      {name}
    </div>
  );
};

export default TeamCard;
