// Separated ChapterCard component with proper typing and accessibility
import React, { memo } from 'react';
import { gameBalance } from '../../constants/gameBalance';
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
    return 'border-ember bg-ember/20 ring-2 ring-ember/50 animate-ember-glow';
  }
  if (isCompleted) {
    return 'border-forest bg-forest/20 animate-forge-flicker';
  }
  if (isUnlocked) {
    return 'border-bronze bg-bronze/20 hover:border-ember hover:bg-ember/10 hover:animate-ember-glow';
  }
  return 'border-iron bg-iron/20 opacity-50';
};

const getChapterStateLabel = (isActive: boolean, isCompleted: boolean): string | null => {
  if (isCompleted) return 'Completed';
  if (isActive) return 'Active';
  return null;
};

const renderStarRating = (rating: number): React.JSX.Element[] => {
  return Array.from({ length: gameBalance.UI.MAX_STAR_RATING }, (_, i) => (
    <span
      key={i}
      className={`text-sm ${
        i < rating ? 'text-ember animate-ember-glow' : 'text-iron-light'
      }`}
      aria-hidden="true"
    >
      ⚔
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
        p-6 rounded-lg border-2 transition-all duration-300 outline-none bg-metal-texture
        focus:ring-2 focus:ring-ember focus:ring-offset-2
        ${stateStyles}
        ${isUnlocked ? 'cursor-pointer hover:animate-battle-shake' : 'cursor-not-allowed'}
      `}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-frontier font-bold text-parchment-light flex-1 mr-2 text-battle-worn">
          {chapter.title}
        </h3>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Star Rating */}
          <div className="flex" role="img" aria-label={`Difficulty: ${chapter.starRating} out of ${gameBalance.UI.MAX_STAR_RATING} stars`}>
            {renderStarRating(chapter.starRating)}
          </div>

          {/* Status Badge */}
          {stateLabel && (
            <span className={`text-sm font-frontier font-bold px-3 py-1 rounded border-2 ${
              isCompleted ? 'text-parchment-light bg-forest border-forest-dark' : 'text-iron-dark bg-ember border-ember-dark'
            }`}>
              {stateLabel}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-parchment italic mb-2 text-sm font-parchment">
        {chapter.subtitle}
      </p>

      {/* Description */}
      <p className="text-parchment-light mb-4 text-sm leading-relaxed font-parchment">
        {chapter.description}
      </p>

      {/* Progress Bar (if in progress) */}
      {isActive && progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-frontier font-bold text-parchment">Progress</span>
            <span className="text-xs text-parchment font-parchment">{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full bg-iron-dark rounded-full h-3 border border-bronze">
            <div
              className="bg-ember h-3 rounded-full transition-all duration-500 animate-ember-glow"
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
          <span className="font-frontier font-bold text-bronze">Theme:</span>
          <span className="ml-1 text-parchment font-parchment">{chapter.theme}</span>
        </div>
        <div>
          <span className="font-frontier font-bold text-bronze">Est. Turns:</span>
          <span className="ml-1 text-parchment font-parchment">
            {chapter.estimatedTurns[0]}-{chapter.estimatedTurns[1]}
          </span>
        </div>
      </div>

      {/* Prerequisites (if locked) */}
      {!isUnlocked && chapter.prerequisites.length > 0 && (
        <div className="mt-3 p-3 bg-blood/20 border-2 border-blood rounded border-battle">
          <span className="text-blood text-sm font-frontier font-bold">Prerequisites:</span>
          <div className="text-blood-light text-sm mt-1 font-parchment">
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