export type DateValue = string; // ISO date "YYYY-MM-DD", or "C" (Current), or "U" (Unavailable)

export interface ChargeabilityRow {
  allChargeability: DateValue;
  china: DateValue;
  india: DateValue;
  mexico: DateValue;
  philippines: DateValue;
}

export type CategoryTable = {
  [category: string]: ChargeabilityRow;
};

export interface VisaBulletin {
  fetchedAt: string;
  bulletinMonth: string;
  bulletinYear: number;
  employmentBased: {
    finalActionDates: CategoryTable;
    datesForFiling: CategoryTable;
  };
  familyBased: {
    finalActionDates: CategoryTable;
    datesForFiling: CategoryTable;
  };
}

export interface BulletinHistoryEntry {
  bulletinMonth: string; // "2026-03"
  finalActionDate: DateValue;
  datesForFilingDate: DateValue;
}

export interface BulletinHistory {
  category: string;
  chargeability: string;
  entries: BulletinHistoryEntry[];
}
