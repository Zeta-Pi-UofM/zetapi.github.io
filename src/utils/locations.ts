// Maps U-M building abbreviations to full names so event locations like
// "NUB 1528" can link to the Registrar's Location Abbreviations reference.
// Hand-maintained from the Registrar / CRLT lists — that page is a flat table
// with no per-building anchors, so links point at the page as a whole.

export const REGISTRAR_LOCATIONS_URL =
  "https://ro.umich.edu/calendars/schedule-classes/location-abbreviations";

export const BUILDING_ABBREVIATIONS: Record<string, string> = {
  NUB: "North University Building",
  AH: "Angell Hall",
  MH: "Mason Hall",
  DENN: "Dennison Building",
  EECS: "Electrical Engineering and Computer Science Building",
  BBB: "Bob and Betty Beyster Building",
  DOW: "Dow Engineering Building",
  GGBL: "G. G. Brown Laboratory",
  FXB: "François-Xavier Bagnoud Building",
  CHEM: "Chemistry Building",
  MLB: "Modern Languages Building",
  USB: "Undergraduate Science Building",
  NQ: "North Quad",
  CCCB: "Central Campus Classroom Building",
  LSA: "LSA Building",
  SHAPIRO: "Shapiro Undergraduate Library",
  PIERPONT: "Pierpont Commons",
  DUDE: "Duderstadt Center",
  WEISER: "Weiser Hall",
  ROSS: "Stephen M. Ross School of Business",
};

export interface ParsedLocation {
  abbrev: string; // recognized building token, e.g. "NUB"
  buildingName: string; // full name for a tooltip
  rest: string; // remainder of the string, e.g. "1528" ("" if none)
}

/**
 * If `location` begins with a recognized building abbreviation, return its
 * parts; otherwise `null` (caller renders the raw string unchanged).
 */
export function parseLocation(location: string): ParsedLocation | null {
  const trimmed = location.trim();
  const spaceIdx = trimmed.search(/\s/);
  const firstToken = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
  const abbrev = firstToken.toUpperCase();
  const buildingName = BUILDING_ABBREVIATIONS[abbrev];
  if (!buildingName) return null;
  return {
    abbrev,
    buildingName,
    rest: spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim(),
  };
}
