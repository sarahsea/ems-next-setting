"use client";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";
import React, { useState } from "react";

function ThemeModeSelect() {
  const [value, setValue] = useState("system");
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Selected theme mode:", value);
    setValue(value);
    setMode(value); // Update the mode in the color scheme
    // Here you can add logic to change the theme mode
    // For example, you might want to set a state or call a function to update the theme
  };
  return (
    <Select value={value} defaultValue="system" onChange={handleChange}>
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}

export default ThemeModeSelect;
