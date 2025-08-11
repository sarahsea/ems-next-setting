import ThemeModeSelect from "@/shared/ui/app/ThemeModeSelect";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import React from "react";

function FleetMap() {
  return (
    <div>
      <Card>
        <h1>Fleet Map</h1>
        <p>This is the Fleet Map page.</p>
        <ThemeModeSelect />
      </Card>
    </div>
  );
}

export default FleetMap;
