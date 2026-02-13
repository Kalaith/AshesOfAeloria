/**
 * Game Status Display Component
 * Shows current game phase and turn information
 */

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/EnhancedButton";
import type { Phase } from "../../types/game";

interface GameStatusProps {
  turn: number;
  phase: Phase;
  onEndTurn: () => void;
  canEndTurn?: boolean;
  className?: string;
}

const phaseInfoByPhase: Record<
  Phase,
  { label: string; color: string; icon: string }
> = {
  player: {
    label: "Your Command",
    color: "text-forest bg-forest/20 border-forest",
    icon: "⚔",
  },
  enemy: {
    label: "Enemy Assault",
    color: "text-blood bg-blood/20 border-blood",
    icon: "🛡",
  },
  upkeep: {
    label: "Supply & Logistics",
    color: "text-amber bg-amber/20 border-amber",
    icon: "⚙",
  },
};

export const GameStatus: React.FC<GameStatusProps> = ({
  turn,
  phase,
  onEndTurn,
  canEndTurn = true,
  className = "",
}) => {
  const phaseInfo = phaseInfoByPhase[phase];

  return (
    <Card className={`bg-card-enhanced p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-frontier font-bold text-battle-worn">
          ⚡ Campaign Status
        </h3>
        <div className="text-sm font-frontier font-bold text-dark-enhanced bg-bronze/30 px-2 py-1 rounded border border-bronze">
          Turn {turn}
        </div>
      </div>

      <div
        className={`
        flex items-center justify-center p-3 rounded-lg border-2 mb-4 font-frontier font-bold
        ${phaseInfo.color}
      `}
      >
        <span className="text-lg mr-2">{phaseInfo.icon}</span>
        <span className="font-bold">{phaseInfo.label}</span>
      </div>

      {phase === "player" && (
        <Button
          variant="primary"
          fullWidth
          onClick={onEndTurn}
          disabled={!canEndTurn}
          rightIcon="⚡"
          className="font-frontier font-bold"
        >
          Conclude Turn
        </Button>
      )}

      {phase === "enemy" && (
        <div className="text-center text-sm font-parchment text-dark-enhanced animate-forge-flicker">
          Enemy forces are maneuvering across the battlefield...
        </div>
      )}

      {phase === "upkeep" && (
        <div className="text-center text-sm font-parchment text-dark-enhanced animate-forge-flicker">
          Processing supply lines and reinforcements...
        </div>
      )}
    </Card>
  );
};
