import React from "react";
import { ResourceDisplay } from "../features/ResourceDisplay";
import { GameStatus } from "../features/GameStatus";
import { Button } from "../ui/EnhancedButton";
import { useGameActions } from "../../hooks/useGameActions";
import { useGameStore } from "../../stores/useGameStore";
import { calculateIncome } from "../../utils/gameLogic";

interface EnhancedLeftPanelProps {
  onRecruitClick: () => void;
  onHelpClick: () => void;
  className?: string;
}

export const EnhancedLeftPanel: React.FC<EnhancedLeftPanelProps> = ({
  onRecruitClick,
  onHelpClick,
  className = "",
}) => {
  const { resources, phase, completeTurn, canPerformActions } =
    useGameActions();

  const { turn, nodes } = useGameStore();

  const income = calculateIncome(nodes);

  return (
    <div className={`space-y-4 ${className}`}>
      <ResourceDisplay resources={resources} income={income} showIncome={true} />

      <GameStatus
        turn={turn}
        phase={phase}
        onEndTurn={completeTurn}
        canEndTurn={canPerformActions}
      />

      <div className="space-y-2">
        <Button
          variant="success"
          fullWidth
          onClick={onRecruitClick}
          leftIcon="?"
          disabled={!canPerformActions}
          className="font-frontier font-bold"
        >
          Recruit War Leader
        </Button>

        <Button
          variant="ghost"
          fullWidth
          onClick={onHelpClick}
          leftIcon="??"
          className="font-frontier font-bold"
        >
          War Manual & Strategy
        </Button>
      </div>
    </div>
  );
};
