export interface PokerPosition {
  id: string;
  name: string;
  label: string;
}

export interface TableType {
  id: string;
  name: string;
  label: string;
}

export interface PlayerCount {
  id: string;
  count: number;
  label: string;
}

export interface EffectiveStack {
  id: string;
  blinds: string;
  label: string;
}

export interface Position {
  id: string;
  name: string;
  label: string;
}

export interface FilterState {
  tableType: string;
  players: string;
  effectiveStack: string;
  myPosition: string;
  opponentPosition?: string;
}

export interface RangeResult {
  id: string;
  title: string;
  imagePath: string;
  description?: string;
}