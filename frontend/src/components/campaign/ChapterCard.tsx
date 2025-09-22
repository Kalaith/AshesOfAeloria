// Separated ChapterCard component with proper typing and accessibility
import React, { memo } from 'react';
import { GAME_BALANCE } from '../../constants/gameBalance';
import type { CampaignChapter } from '../../data/campaignData';

export interface ChapterCardProps {
  chapter: CampaignChapter;
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  progress?: number;
  onClick: (chapterId: string) => void;
}

const getChapterStateStyles = (isActive: boolean, isCompleted: boolean, isUnlocked: boolean): string => {
  if (isActive) {
    return 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200';
  }
  if (isCompleted) {
    return 'border-green-400 bg-green-50';
  }
  if (isUnlocked) {
    return 'border-blue-400 bg-blue-50 hover:border-blue-500 hover:shadow-md';
  }
  return 'border-gray-300 bg-gray-100 opacity-50';
};

const getChapterStateLabel = (isActive: boolean, isCompleted: boolean): string | null => {
  if (isCompleted) return 'Completed';
  if (isActive) return 'Active';
  return null;
};

const renderStarRating = (rating: number): JSX.Element[] => {
  return Array.from({ length: GAME_BALANCE.UI.MAX_STAR_RATING }, (_, i) => (
    <span
      key={i}
      className={`text-sm ${
        i < rating ? 'text-yellow-400' : 'text-gray-300'
      }`}
      aria-hidden="true"
    >
      ★
    </span>
  ));
};

export const ChapterCard = memo<ChapterCardProps>(({
  chapter,
  isUnlocked,
  isCompleted,
  isActive,
  progress = 0,
  onClick
}) => {
  const stateStyles = getChapterStateStyles(isActive, isCompleted, isUnlocked);
  const stateLabel = getChapterStateLabel(isActive, isCompleted);

  const handleClick = () => {
    if (isUnlocked) {
      onClick(chapter.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isUnlocked ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Chapter: ${chapter.title}. ${chapter.subtitle}. ${
        isUnlocked ? 'Click to select.' : 'Locked.'
      }`}
      aria-pressed={isActive}
      aria-disabled={!isUnlocked}
      className={`
        p-6 rounded-lg border-2 transition-all duration-300 outline-none
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${stateStyles}
        ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
      `}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1 mr-2">
          {chapter.title}
        </h3>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Star Rating */}
          <div className="flex" role="img" aria-label={`Difficulty: ${chapter.starRating} out of ${GAME_BALANCE.UI.MAX_STAR_RATING} stars`}>
            {renderStarRating(chapter.starRating)}
          </div>

          {/* Status Badge */}
          {stateLabel && (
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              isCompleted ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
            }`}>
              {stateLabel}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-gray-600 italic mb-2 text-sm">
        {chapter.subtitle}
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {chapter.description}
      </p>

      {/* Progress Bar (if in progress) */}
      {isActive && progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs text-gray-600">{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Chapter Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-semibold text-gray-700">Theme:</span>
          <span className="ml-1 text-gray-600">{chapter.theme}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Est. Turns:</span>
          <span className="ml-1 text-gray-600">
            {chapter.estimatedTurns[0]}-{chapter.estimatedTurns[1]}
          </span>
        </div>
      </div>

      {/* Prerequisites (if locked) */}
      {!isUnlocked && chapter.prerequisites.length > 0 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
          <span className="text-red-700 text-sm font-semibold">Prerequisites:</span>
          <div className="text-red-600 text-sm mt-1">
            {chapter.prerequisites.map((prereq, index) => (
              <span key={prereq}>
                {prereq.replace(/_/g, ' ')}
                {index < chapter.prerequisites.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ChapterCard.displayName = 'ChapterCard';