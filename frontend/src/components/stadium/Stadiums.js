import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddStadiumFrom from "./AddStadiumFrom";
import StadiumCard from "./StadiumCard";
import { getAllStadiums } from "./Service";
import CustomLoading from "../loading/CustomLoading";
const Stadiums = () => {
  const AddStadiumModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [openAddStadium, setOpenAddStadium] = React.useState(false);
  const handleOpen = () => setOpenAddStadium(true);
  const handleClose = () => setOpenAddStadium(false);

  // const stadiumsArr = [
  //   {
  //     id: 1,
  //     name: "Al Bayt Stadium",
  //     rows: 10,
  //     seatsPerRow: 10,
  //   },
  //   {
  //     id: 2,
  //     name: "Al Janoub Stadium",
  //     rows: 10,
  //     seatsPerRow: 9,
  //   },
  //   {
  //     id: 3,
  //     name: "Al Wakrah Stadium",
  //     rows: 5,
  //     seatsPerRow: 10,
  //   },
  //   {
  //     id: 4,
  //     name: "Al Bayt Stadium",
  //     rows: 10,
  //     seatsPerRow: 10,
  //   },
  //   {
  //     id: 5,
  //     name: "Al Janoub Stadium",
  //     rows: 10,
  //     seatsPerRow: 9,
  //   },
  // ];
  const [stadiums, setStadiums] = useState([]);
  const [stadiumsLoading, setStadiumsLoading] = useState(true);
  useEffect(() => {
    getAllStadiums(setStadiums, setStadiumsLoading);
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1 className="mb-5 text-left">Stadiums</h1>
      <div className="row justify-content-center mb-2">
        <div className="col-md-12 d-flex flex-wrap justify-content-between">
          {user?.role === "Manager" && (
            <button className="btn btn-dark" onClick={handleOpen}>
              Add Stadium
            </button>
          )}
          <Modal
            open={openAddStadium}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={AddStadiumModal}>
              <AddStadiumFrom
                onClose={handleClose}
                setStadiums={setStadiums}
                stadiums={stadiums}
              />
            </Box>
          </Modal>
        </div>
      </div>
      <div className="row mt-2">
        {stadiumsLoading && <CustomLoading />}
        {stadiums.map((stadium) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mb-2 d-flex justify-content-center">
              <StadiumCard
                key={stadium.id}
                id={stadium.id}
                name={stadium.name}
                numberOfSeats={stadium.rows * stadium.seatsPerRow}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stadiums;
