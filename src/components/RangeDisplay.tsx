'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RangeResult } from '@/types/poker';

interface RangeDisplayProps {
  ranges: RangeResult[];
  title: string;
}

export default function RangeDisplay({ ranges, title }: RangeDisplayProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Create a stable key for each range to prevent unnecessary re-renders
  const rangeKeys = React.useMemo(() => {
    return ranges.map((range) => `${range.id}-${range.imagePath}`);
  }, [ranges]);

  const handleImageError = React.useCallback(
    (rangeId: string, imagePath: string) => {
      const imageKey = `${rangeId}-${imagePath}`;
      setFailedImages((prev) => {
        if (prev.has(imageKey)) {
          return prev; // Don't update if already failed
        }
        const newSet = new Set(prev);
        newSet.add(imageKey);
        return newSet;
      });
    },
    []
  );

  // Clear failed images when ranges change completely
  React.useEffect(() => {
    setFailedImages((prev) => {
      const newSet = new Set<string>();
      // Keep only failed images that still exist in current ranges
      rangeKeys.forEach((key) => {
        if (prev.has(key)) {
          newSet.add(key);
        }
      });
      return newSet;
    });
  }, [rangeKeys]);

  if (ranges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border-2 border-dashed border-gray-600">
          <div className="text-gray-500 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-300 text-lg font-semibold">
            No range pictures available for the selected filters.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Select your position and opponents to see the ranges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
        {ranges.map((range) => (
          <div
            key={range.id}
            className={ranges.length === 1 ? 'lg:col-span-2' : ''}
          >
            <div className="bg-[#0f1b32] backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 border-b border-white/10 flex-shrink-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {range.title}
                </h3>
                {range.description && (
                  <p className="text-sm text-gray-300">{range.description}</p>
                )}
              </div>
              <div className="p-4 flex-1 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  {failedImages.has(`${range.id}-${range.imagePath}`) ? (
                    // Modern fallback content when image fails to load - make it responsive to other images
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-dashed border-gray-500 rounded-xl p-8 text-center w-full h-full flex flex-col justify-center">
                      <div className="text-gray-400 mb-4">
                        <svg
                          className="mx-auto h-20 w-20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-semibold text-lg">
                        Range chart not available
                      </p>
                      <p className="text-gray-400 text-sm mt-2 font-mono bg-gray-600 px-3 py-1 rounded-lg inline-block">
                        {range.imagePath}
                      </p>
                    </div>
                  ) : (
                    <div className="relative group w-full h-full flex items-center justify-center">
                      <img
                        key={`${range.id}-${range.imagePath}`}
                        src={range.imagePath}
                        alt={range.title}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        onError={() =>
                          handleImageError(range.id, range.imagePath)
                        }
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
