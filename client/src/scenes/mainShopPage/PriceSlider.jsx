import React, { useState, useEffect } from "react";
import { Stack, Typography, Slider, TextField } from "@mui/material";

const PriceSlider = () => {
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(30);
  const minmin = 0;
  const maxmax = 30;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 30]);

  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  console.log(priceRangeValue);

  return (
    <div margin="200px 0">
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minmin}
        max={maxmax}
      />
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <TextField
          label="min"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "90px" }}
          value={minNum}
          onChange={(e) => {
            setMinNum(Number(e.target.value));
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
        />
        <Typography>-</Typography>
        <TextField
          label="max"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "90px" }}
          value={maxNum}
          onChange={(e) => {
            setMaxNum(Number(e.target.value));
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
        />
      </Stack>
    </div>
  );
}

export default PriceSlider;