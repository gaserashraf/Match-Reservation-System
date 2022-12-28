import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const CustomLoading = () => {
  return (
    <Grid container wrap="wrap" justifyContent='center'>
      {Array.from(new Array(4)).map((item, index) => (
        <Box key={index} sx={{ width: 250, marginRight: 2, my: 5 }}>
          <Skeleton
            variant="rectangular"
            width={250}
            height={200}
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default CustomLoading;
