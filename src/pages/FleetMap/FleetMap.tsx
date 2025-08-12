import ThemeModeSelect from "@/shared/ui/app/ThemeModeSelect";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";

function FleetMap() {
  return (
    <div>
      <Card>
        <h1>Fleet Map</h1>
        <p>This is the Fleet Map page.</p>
        <ThemeModeSelect />
        <Stack
          sx={{
            width: "100%",
            borderRadius: "4px",
            p: 2,
            gap: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            color: "text.primary",
            // transition: "1s",
          }}
        >
          <Slider />
          <Switch />
          <ToggleButton></ToggleButton>
          <Badge />
        </Stack>
      </Card>
    </div>
  );
}

export default FleetMap;
