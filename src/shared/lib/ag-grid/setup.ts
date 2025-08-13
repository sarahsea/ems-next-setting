import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { ColumnMenuModule, LicenseManager } from "ag-grid-enterprise";

export const setupAgGrid = () => {
  LicenseManager.setLicenseKey(
    process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY || ""
  );
  ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnMenuModule]);
};
