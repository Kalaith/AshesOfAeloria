import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useGameStore } from "../../stores/useGameStore";

interface ActionsPanelProps {
  onHelpClick: () => void;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({ onHelpClick }) => {
  const phase = useGameStore((state) => state.phase);
  const endTurn = useGameStore((state) => state.endTurn);

  const handleEndTurn = () => {
    endTurn();
  };

  return (
    <Card className="space-y-3 lg:space-y-4">
      <h3 className="text-base lg:text-lg font-frontier font-bold text-iron-dark border-b-2 border-bronze pb-2 text-battle-worn">
        ⚔ War Council
      </h3>
      <Button
        variant={phase === "player" ? "primary" : "secondary"}
        fullWidth
        onClick={handleEndTurn}
        disabled={phase !== "player"}
        className="font-frontier font-bold"
      >
        {phase === "player"
          ? "⚡ End Campaign Turn"
          : "⏳ Enemy Forces Moving..."}
      </Button>
      <Button
        variant="outline"
        fullWidth
        onClick={onHelpClick}
        className="font-frontier font-bold"
      >
        📜 Battle Manual & Tactics
      </Button>
    </Card>
  );
};
