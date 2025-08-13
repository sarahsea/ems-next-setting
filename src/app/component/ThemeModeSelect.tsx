"use client";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";

function ThemeModeSelect() {
  const [value, setValue] = useState("system");
  const { setMode } = useColorScheme();
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    setMode(value); // Update the mode in the color scheme
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
