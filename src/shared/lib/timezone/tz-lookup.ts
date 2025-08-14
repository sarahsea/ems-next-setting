import tz from "tz-lookup";

export const getTimezone = (latitude: number, longitude: number): string => {
  return tz(latitude, longitude) || "";
};
