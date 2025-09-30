'use client';

import { useState, useRef } from 'react';
import FilterSelect from './FilterSelect';
import RangeDisplay from './RangeDisplay';
import {
  TABLE_TYPES,
  PLAYER_COUNTS,
  EFFECTIVE_STACKS,
  POSITIONS,
  POSITIONS_6MAX,
  POSITIONS_8MAX,
  POSITIONS_9MAX,
} from '@/data/pokerData';
import type { FilterState, RangeResult } from '@/types/poker';

export default function PokerRangeFilter() {
  // Scroll position management
  // Simple refs for any needed state
  const scrollLockRef = useRef(false);
  const skipRangeUpdateRef = useRef(false);
  // Default values
  const defaultFilters: FilterState = {
    tableType: 'mtt',
    players: '8max',
    effectiveStack: '100bb',
    myPosition: 'btn',
    opponentPosition: '',
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const [showOpponentRFI, setShowOpponentRFI] = useState(false);
  const [show3Bet, setShow3Bet] = useState(false);
  const [opponentRFIPosition, setOpponentRFIPosition] = useState('');
  const [opponent3BetPosition, setOpponent3BetPosition] = useState('');
  const [ranges, setRanges] = useState<RangeResult[]>([]);
  const [autoResetOpponents, setAutoResetOpponents] = useState(true);

  // Get positions based on player count
  const getMyPositions = () => {
    switch (filters.players) {
      case '6max':
        return POSITIONS_6MAX;
      case '8max':
        return POSITIONS_8MAX;
      case '9max':
        return POSITIONS_9MAX;
      default:
        return POSITIONS;
    }
  };

  const getOpponentPositions = () => {
    const myPositions = getMyPositions();
    return myPositions.filter((pos) => pos.id !== filters.myPosition);
  };

  // Navigation functions
  const nextPosition = () => {
    const positions = getMyPositions();
    const currentIndex = positions.findIndex(
      (p) => p.id === filters.myPosition
    );
    const nextIndex = (currentIndex + 1) % positions.length;
    const nextPosition = positions[nextIndex];

    updateFilter('myPosition', nextPosition.id);

    if (autoResetOpponents) {
      resetOpponentSelections();
    }
  };

  const resetOpponentSelections = () => {
    setOpponentRFIPosition('');
    setOpponent3BetPosition('');
    setShowOpponentRFI(false);
    setShow3Bet(false);
    setFilters((prev) => ({ ...prev, opponentPosition: '' }));
  };

  const nextStack = () => {
    const currentIndex = EFFECTIVE_STACKS.findIndex(
      (s) => s.id === filters.effectiveStack
    );
    const nextIndex = (currentIndex + 1) % EFFECTIVE_STACKS.length;
    updateFilter('effectiveStack', EFFECTIVE_STACKS[nextIndex].id);
  };

  const prevStack = () => {
    const currentIndex = EFFECTIVE_STACKS.findIndex(
      (s) => s.id === filters.effectiveStack
    );
    const prevIndex =
      currentIndex === 0 ? EFFECTIVE_STACKS.length - 1 : currentIndex - 1;
    updateFilter('effectiveStack', EFFECTIVE_STACKS[prevIndex].id);
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-4">
            🃏 Poker Range Analyzer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced pre-flop range analysis tool for optimal tournament and
            cash game strategy
          </p>
        </header>

        {/* Auto-reset toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur rounded-xl p-4 border border-white/20">
            <span className="text-gray-300 font-medium">Reset opponents:</span>
            <button
              onClick={() => setAutoResetOpponents(!autoResetOpponents)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                autoResetOpponents
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                  : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  autoResetOpponents ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-400">
              {autoResetOpponents ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Current stack display between navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur rounded-xl px-6 py-3 border border-blue-400/30">
            <div className="text-center">
              <div className="text-sm text-blue-300 font-medium mb-1">
                Current Stack
              </div>
              <div className="text-2xl font-bold text-blue-100">
                💰{' '}
                {EFFECTIVE_STACKS.find((s) => s.id === filters.effectiveStack)
                  ?.label || filters.effectiveStack}
              </div>
            </div>
          </div>
        </div>

        {/* Modern Filter Grid */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur rounded-xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Table Type */}
            <div className="space-y-2">
              <FilterSelect
                label="Table Type"
                value={filters.tableType}
                options={TABLE_TYPES}
                onChange={(value) => updateFilter('tableType', value)}
                required
              />
            </div>

            {/* Players */}
            <div className="space-y-2">
              <FilterSelect
                label="Players"
                value={filters.players}
                options={PLAYER_COUNTS.map((p) => ({
                  id: p.id,
                  label: p.label,
                }))}
                onChange={(value) => updateFilter('players', value)}
                required
              />
            </div>

            {/* Effective Stack */}
            <div className="space-y-2">
              <FilterSelect
                label="Stack Size"
                value={filters.effectiveStack}
                options={EFFECTIVE_STACKS}
                onChange={(value) => updateFilter('effectiveStack', value)}
                required
              />
            </div>

            {/* My Position */}
            <div className="space-y-2">
              <FilterSelect
                label="My Position"
                value={filters.myPosition}
                options={getMyPositions()}
                onChange={(value) => updateFilter('myPosition', value)}
                required
              />
            </div>

            {/* Opponent RFI Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                vs Opponent RFI
              </label>
              <button
                onClick={() => {
                  setShowOpponentRFI(!showOpponentRFI);
                  if (!showOpponentRFI) {
                    setShow3Bet(false);
                    setOpponent3BetPosition('');
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  showOpponentRFI
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {showOpponentRFI ? '✅ Enabled' : '❌ Disabled'}
              </button>
            </div>

            {/* 3-Bet Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                vs 3-Bet
              </label>
              <button
                onClick={() => {
                  if (showOpponentRFI) {
                    setShow3Bet(!show3Bet);
                  }
                }}
                disabled={!showOpponentRFI}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  !showOpponentRFI
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : show3Bet
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {!showOpponentRFI
                  ? '🚫 Requires RFI'
                  : show3Bet
                  ? '✅ Enabled'
                  : '❌ Disabled'}
              </button>
            </div>
          </div>

          {/* Conditional Opponent Selections */}
          {showOpponentRFI && (
            <div className="mt-6 pt-6 border-t border-gray-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opponent RFI Position */}
                <div className="space-y-2">
                  <FilterSelect
                    label="Opponent RFI Position"
                    value={opponentRFIPosition}
                    options={getOpponentPositions()}
                    onChange={setOpponentRFIPosition}
                  />
                </div>

                {/* Conditional 3-Bet Position */}
                {show3Bet && (
                  <div className="space-y-2">
                    <FilterSelect
                      label="Opponent 3-Bet Position"
                      value={opponent3BetPosition}
                      options={getOpponentPositions().filter(
                        (pos) => pos.id !== opponentRFIPosition
                      )}
                      onChange={setOpponent3BetPosition}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-sm font-medium">
                    Navigate:
                  </span>
                  <div
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextPosition();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        nextPosition();
                      }
                    }}
                    style={{ touchAction: 'none' }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-medium whitespace-nowrap cursor-pointer select-none"
                    title="Next Position"
                    tabIndex={0}
                  >
                    ➡️ Next Position
                  </div>
                </div>
              </div>
              <RangeDisplay
                key="poker-range-display"
                ranges={ranges}
                title=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed floating Next Position button - at top of group */}
      <div
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextPosition();
        }}
        className="fixed bottom-64 left-6 z-50 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold"
        title="Next Position (Fixed)"
        style={{ touchAction: 'none' }}
      >
        ➡️ Next
      </div>

      <div
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevStack();
        }}
        className="fixed bottom-32 left-6 z-50 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold"
        title="Stack Up (Fixed)"
        style={{ touchAction: 'none' }}
      >
        🔺 Up
      </div>

      <div
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextStack();
        }}
        className="fixed bottom-16 left-6 z-50 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold"
        title="Stack Down (Fixed)"
        style={{ touchAction: 'none' }}
      >
        🔻 Down
      </div>
      {/* Fixed floating Stack display and controls - below all buttons */}
      <div
        className="fixed bottom-6 left-6 z-50 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full shadow-2xl cursor-default select-none flex items-center gap-2 text-lg font-bold border-2 border-white/20"
        title="Current Stack Size"
        style={{ touchAction: 'none' }}
      >
        💰{' '}
        {EFFECTIVE_STACKS.find((s) => s.id === filters.effectiveStack)?.label ||
          filters.effectiveStack}
      </div>
    </div>
  );
}
