'use client';

import React, { useState, useEffect } from 'react';
import FilterSelect from '@/components/FilterSelect';
import RangeDisplay from '@/components/RangeDisplay';
import { FilterState, RangeResult } from '@/types/poker';
import {
  TABLE_TYPES,
  PLAYER_COUNTS,
  EFFECTIVE_STACKS,
  POSITIONS,
  POSITIONS_6MAX,
  POSITIONS_8MAX,
  POSITIONS_9MAX,
} from '@/data/pokerData';

export default function PokerRangeFilter() {
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
  const [autoResetOpponents, setAutoResetOpponents] = useState(true);
  const [ranges, setRanges] = useState<RangeResult[]>([]);

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
    // Use the same positions as "my position" based on player count
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

  const getOpponentRFIPositions = () => {
    // Get base positions and add SB (Limp) option
    const basePositions = getOpponentPositions();
    const rfiPositions = [];

    // Add positions up to SB, then insert SB (Limp), then continue
    for (const position of basePositions) {
      rfiPositions.push(position);
      // Add SB (Limp) after SB but before BB
      if (position.id === 'sb') {
        rfiPositions.push({
          id: 'sb-limp',
          name: 'sb-limp',
          label: 'SB (Limp)',
        });
      }
    }

    return rfiPositions;
  };

  // Helper function to get position label by ID
  const getPositionLabel = React.useCallback(
    (positionId: string) => {
      // Handle special case for SB Limp
      if (positionId === 'sb-limp') {
        return 'SB (Limp)';
      }

      const positions = getMyPositions();
      const position = positions.find((p) => p.id === positionId);
      return position ? position.label : positionId.toUpperCase();
    },
    [filters.players]
  ); // Only depend on players since that affects which positions are available

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      // Clear position selections when player count changes
      if (key === 'players') {
        newFilters.myPosition = '';
        newFilters.opponentPosition = '';
        // Also clear the separate opponent positions
        setOpponentRFIPosition('');
        setOpponent3BetPosition('');
      }

      // Clear 3-bet opponent when 10bb-no-limp is selected (vs3Bet folder missing)
      if (key === 'effectiveStack' && value === '10bb-no-limp') {
        setOpponent3BetPosition('');
      }

      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setShowOpponentRFI(false);
    setShow3Bet(false);
    setOpponentRFIPosition('');
    setOpponent3BetPosition('');
    setRanges([]);
  };

  // Function to cycle to next position
  const nextPosition = () => {
    const scrollY = window.scrollY;
    const positions = getMyPositions();
    if (positions.length === 0) return;

    const currentIndex = positions.findIndex(
      (p) => p.id === filters.myPosition
    );
    const nextIndex =
      currentIndex === -1
        ? positions.length - 1
        : (currentIndex - 1 + positions.length) % positions.length;
    const nextPos = positions[nextIndex];

    updateFilter('myPosition', nextPos.id);

    // Auto-reset opponents if toggle is enabled
    if (autoResetOpponents) {
      setOpponentRFIPosition('');
      setOpponent3BetPosition('');
    }

    // Force scroll position to stay
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  // Function to cycle to next stack (smaller)
  const nextStack = () => {
    const scrollY = window.scrollY;
    const currentIndex = EFFECTIVE_STACKS.findIndex(
      (s) => s.id === filters.effectiveStack
    );
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % EFFECTIVE_STACKS.length;
    const nextStack = EFFECTIVE_STACKS[nextIndex];

    updateFilter('effectiveStack', nextStack.id);

    // Force scroll position to stay
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  // Function to cycle to previous stack (larger)
  const prevStack = () => {
    const scrollY = window.scrollY;
    const currentIndex = EFFECTIVE_STACKS.findIndex(
      (s) => s.id === filters.effectiveStack
    );
    const prevIndex =
      currentIndex === -1
        ? 0
        : (currentIndex - 1 + EFFECTIVE_STACKS.length) %
          EFFECTIVE_STACKS.length;
    const prevStack = EFFECTIVE_STACKS[prevIndex];

    updateFilter('effectiveStack', prevStack.id);

    // Force scroll position to stay
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  // Mock function to generate ranges based on filters
  const generateRanges = React.useCallback(() => {
    // This would typically fetch data from an API or database
    const mockRanges: RangeResult[] = [];

    if (
      filters.tableType &&
      filters.players &&
      filters.effectiveStack &&
      filters.myPosition
    ) {
      const myPositionLabel = getPositionLabel(filters.myPosition);
      const stackSize = filters.effectiveStack;
      const tableType = filters.tableType;
      const playerCount = filters.players;

      // 1. Show 3-bet range if opponent position selected (vs3Bet)
      if (opponent3BetPosition) {
        const opponentLabel = getPositionLabel(opponent3BetPosition);

        // Add vs 3-Bet range (how to play against opponent's 3-bet)
        mockRanges.push({
          id: 'vs-3bet-range',
          title: `vs 3-Bet | ${myPositionLabel} vs ${opponentLabel}`,
          imagePath: `/ranges/${tableType.toUpperCase()}/${playerCount.toUpperCase()}/${stackSize.toUpperCase()}/vs3Bet/${filters.myPosition.toUpperCase()}vs${opponent3BetPosition.toUpperCase()}.jpg`,
          // description: `How to play from ${myPositionLabel} against ${opponentLabel} 3-Bet`,
        });
      }

      // 2. Show vsRFI range if opponent RFI position selected
      if (opponentRFIPosition) {
        const opponentLabel = getPositionLabel(opponentRFIPosition);

        // Handle SB (Limp) special case for file path
        let opponentFilePosition;
        let fileSuffix = '';

        if (opponentRFIPosition === 'sb-limp') {
          opponentFilePosition = 'SB';
          fileSuffix = '-LIMP';
        } else {
          opponentFilePosition = opponentRFIPosition.toUpperCase();
        }

        // Add vs RFI range (how to play against opponent's RFI)
        mockRanges.push({
          id: 'vs-rfi-range',
          title: `vs RFI | ${myPositionLabel} vs ${opponentLabel}`,
          imagePath: `/ranges/${tableType.toUpperCase()}/${playerCount.toUpperCase()}/${stackSize.toUpperCase()}/vsRFI/${filters.myPosition.toUpperCase()}vs${opponentFilePosition}${fileSuffix}.jpg`,
          // description: `How to play from ${myPositionLabel} against ${opponentLabel} RFI`,
        });
      }

      // 3. Generate main RFI range picture for my position
      mockRanges.push({
        id: 'my-rfi-range',
        title: `RFI | ${myPositionLabel}`,
        imagePath: `/ranges/${tableType.toUpperCase()}/${playerCount.toUpperCase()}/${stackSize.toUpperCase()}/RFI/${filters.myPosition.toUpperCase()}.jpg`,
        // description: `Raise First In range for ${myPositionLabel} position`,
      });

      // 4. Show opponent RFI range if opponent position selected
      if (opponentRFIPosition) {
        const opponentLabel = getPositionLabel(opponentRFIPosition);
        mockRanges.push({
          id: 'opponent-rfi-range',
          title: `Opponent RFI | ${opponentLabel}`,
          imagePath: `/ranges/${tableType.toUpperCase()}/${playerCount.toUpperCase()}/${stackSize.toUpperCase()}/RFI/${opponentRFIPosition.toUpperCase()}.jpg`,
          // description: `Opponent's RFI range from ${opponentLabel} position`,
        });
      }
    }

    setRanges(mockRanges);
  }, [filters, opponentRFIPosition, opponent3BetPosition, getPositionLabel]);

  useEffect(() => {
    if (filters.myPosition) {
      generateRanges();
    }
  }, [filters, generateRanges, opponentRFIPosition, opponent3BetPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 via-blue-900 to-slate-900 relative overflow-hidden p-4 sm:p-6">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/5 to-indigo-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400/15 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-[#0f1b32]/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Poker Range Analyzer
              </h1>
              <p className="text-gray-300 text-lg">
                Master your pre-flop strategy with precision
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-black/30 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-black/40 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Reset All
            </button>
          </div>

          {/* Modern Filter Grid */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20 shadow-2xl">
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

              {/* Opponent RFI Position */}
              <div className="space-y-2">
                <FilterSelect
                  label="vs RFI"
                  value={opponentRFIPosition}
                  options={getOpponentRFIPositions()}
                  onChange={(value) => setOpponentRFIPosition(value)}
                />
              </div>

              {/* 3-Bet Opponent Position */}
              <div className="space-y-2">
                <FilterSelect
                  label="vs 3-Bet"
                  value={
                    filters.effectiveStack === '10bb-no-limp'
                      ? ''
                      : opponent3BetPosition
                  }
                  options={getOpponentPositions()}
                  onChange={(value) => {
                    if (filters.effectiveStack !== '10bb-no-limp') {
                      setOpponent3BetPosition(value);
                    }
                  }}
                  disabled={filters.effectiveStack === '10bb-no-limp'}
                />
              </div>
            </div>
          </div>

          {/* Modern Range Display */}
          {ranges.length > 0 && (
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex  gap-3">
                  <button
                    onClick={nextPosition}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-medium whitespace-nowrap"
                    title="Next Position"
                  >
                    ➡️ Next Position
                  </button>

                  <button
                    onClick={prevStack}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-medium whitespace-nowrap"
                    title="Previous Stack (Larger)"
                  >
                    🔺 Stack Up
                  </button>
                  <button
                    onClick={nextStack}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-medium whitespace-nowrap"
                    title="Next Stack (Smaller)"
                  >
                    🔻 Stack Down
                  </button>
                  <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/30 rounded-lg">
                    <span className="text-white text-sm font-medium">
                      {autoResetOpponents
                        ? ' Reset opponents:'
                        : ' Keep opponents:'}
                    </span>
                    <button
                      onClick={() => setAutoResetOpponents(!autoResetOpponents)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        autoResetOpponents ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          autoResetOpponents ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="px-6 py-2 bg-gradient-to-r from-gray-800 via-slate-700 to-gray-900 text-white rounded-lg text-xl font-black border-4 border-gray-600/70 hover:border-gray-500/90 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl whitespace-nowrap flex items-center gap-3">
                    <span className="text-2xl animate-pulse">💰</span>
                    <span className="text-shadow-lg drop-shadow-lg tracking-wide">
                      {EFFECTIVE_STACKS.find(
                        (s) => s.id === filters.effectiveStack
                      )?.label || filters.effectiveStack}
                    </span>
                  </div>
                </div>
              </div>
              <RangeDisplay ranges={ranges} title="" />
            </div>
          )}
        </div>
      </div>

      {/* Floating Navigation Buttons */}
      {/* Next Position - Top of group */}
      <button
        type="button"
        onClick={() => {
          nextPosition();
        }}
        className="fixed bottom-94 left-6 z-50 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold border-0"
        title="Next Position"
        style={{ touchAction: 'none' }}
      >
        Next
      </button>

      {/* Stack Up Button */}
      <button
        type="button"
        onClick={() => {
          prevStack();
        }}
        className="fixed bottom-79 left-6 z-50 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold border-0"
        title="Stack Up (Larger)"
        style={{ touchAction: 'none' }}
      >
        Up
      </button>

      {/* Stack Down Button */}
      <button
        type="button"
        onClick={() => {
          nextStack();
        }}
        className="fixed bottom-64 left-6 z-50 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 cursor-pointer select-none flex items-center gap-2 text-lg font-bold border-0"
        title="Stack Down (Smaller)"
        style={{ touchAction: 'none' }}
      >
        Down
      </button>
      {/* Current Stack Display - Dark Highlighted */}
      <div
        className="fixed bottom-47 left-6 z-50 px-4 py-3 bg-gradient-to-r from-gray-800 via-slate-700 to-gray-900 text-white rounded-full shadow-2xl hover:shadow-3xl cursor-default select-none flex items-center gap-3 text-xl font-black border-4 border-gray-600/70 hover:border-gray-500/90 "
        title="Current Stack Size"
        style={{ touchAction: 'none' }}
      >
        <span className="text-shadow-lg drop-shadow-lg tracking-wide">
          {EFFECTIVE_STACKS.find((s) => s.id === filters.effectiveStack)
            ?.label || filters.effectiveStack}
        </span>
      </div>
    </div>
  );
}
