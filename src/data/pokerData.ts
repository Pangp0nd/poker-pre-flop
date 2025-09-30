import { TableType, PlayerCount, EffectiveStack, Position } from '@/types/poker';

export const TABLE_TYPES: TableType[] = [
  { id: 'cash', name: 'cash', label: 'Cash' },
  { id: 'mtt', name: 'mtt', label: 'MTT' },
];

export const PLAYER_COUNTS: PlayerCount[] = [
  { id: '6max', count: 6, label: '6-Max' },
  { id: '8max', count: 8, label: '8-Max' },
  { id: '9max', count: 9, label: '9-Max' },
];

export const EFFECTIVE_STACKS: EffectiveStack[] = [
  { id: '100bb', blinds: '100bb', label: '100bb' },
  { id: '60bb', blinds: '60bb', label: '60bb' },
  { id: '50bb', blinds: '50bb', label: '50bb' },
  { id: '40bb', blinds: '40bb', label: '40bb' },
  { id: '30bb', blinds: '30bb', label: '30bb' },
  { id: '20bb-no-limp', blinds: '20bb (No limp)', label: '20bb (No limp)' },
  { id: '10bb-no-limp', blinds: '10 (No limp)', label: '10 (No limp)' },
];

export const POSITIONS: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg1', label: 'UTG1' },
  { id: 'mp', name: 'mp', label: 'MP' },
  { id: 'mp1', name: 'mp1-hj', label: 'MP1 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const POSITIONS_6MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'mp', name: 'mp-hj', label: 'MP (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const POSITIONS_8MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg1', label: 'UTG1' },
  { id: 'mp', name: 'mp-lj', label: 'MP (LJ)' },
  { id: 'mp1', name: 'mp1-hj', label: 'MP1 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const POSITIONS_9MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg1', label: 'UTG1' },
  { id: 'mp', name: 'mp', label: 'MP' },
  { id: 'mp1', name: 'mp1-lj', label: 'MP1 (LJ)' },
  { id: 'mp2', name: 'mp2-hj', label: 'MP2 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const OPPONENT_POSITIONS: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg+1', label: 'UTG+1' },
  { id: 'mp', name: 'mp', label: 'MP' },
  { id: 'mp1', name: 'mp+1-hj', label: 'MP+1 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const OPPONENT_POSITIONS_6MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'mp', name: 'mp-hj', label: 'MP (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const OPPONENT_POSITIONS_8MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg+1', label: 'UTG+1' },
  { id: 'mp-lj', name: 'mp-lj', label: 'MP (LJ)' },
  { id: 'mp1-hj', name: 'mp+1-hj', label: 'MP+1 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const OPPONENT_POSITIONS_9MAX: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg+1', label: 'UTG+1' },
  { id: 'mp', name: 'mp', label: 'MP' },
  { id: 'mp1-lj', name: 'mp+1-lj', label: 'MP+1 (LJ)' },
  { id: 'mp2-hj', name: 'mp+2-hj', label: 'MP+2 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];

export const POSITION_3BET: Position[] = [
  { id: 'utg', name: 'utg', label: 'UTG' },
  { id: 'utg1', name: 'utg+1', label: 'UTG+1' },
  { id: 'mp', name: 'mp', label: 'MP' },
  { id: 'mp1-hj', name: 'mp+1-hj', label: 'MP+1 (HJ)' },
  { id: 'co', name: 'co', label: 'CO' },
  { id: 'btn', name: 'btn', label: 'BTN' },
  { id: 'sb', name: 'sb', label: 'SB' },
  { id: 'bb', name: 'bb', label: 'BB' },
];