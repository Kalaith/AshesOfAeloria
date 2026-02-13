/**
 * Commander Information Display Component
 * Shows detailed information about selected commanders
 */

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/EnhancedButton";
import { gameData } from "../../data/gameData";
import type { Commander } from "../../types/game";

interface CommanderInfoProps {
  commander: Commander;
  canPerformActions?: boolean;
  onAssign?: (nodeId: number) => void;
  onUnassign?: () => void;
  availableNodes?: Array<{ id: number; type: string; name?: string }>;
  className?: string;
}

interface StatItemProps {
  label: string;
  value: number;
  icon?: string;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  icon,
  color = "text-iron-dark",
}) => (
  <div className="flex justify-between items-center py-1 px-2 bg-bronze/5 rounded border border-bronze/20">
    <span className="text-sm text-parchment-dark font-parchment flex items-center gap-1">
      {icon && <span>{icon}</span>}
      {label}:
    </span>
    <span className={`text-sm font-frontier font-bold ${color}`}>{value}</span>
  </div>
);

const ArmyComposition: React.FC<{ army: Commander["army"] }> = ({ army }) => (
  <div className="space-y-1">
    <div className="text-sm font-frontier font-bold text-iron-dark mb-2 text-battle-worn">
      ⚔ War Band:
    </div>
    <StatItem
      label="Infantry"
      value={army.soldiers}
      icon="⚔"
      color="text-blood"
    />
    <StatItem
      label="Archers"
      value={army.archers}
      icon="🏹"
      color="text-forest"
    />
    <StatItem
      label="Cavalry"
      value={army.cavalry}
      icon="🐎"
      color="text-amber"
    />
    <StatItem
      label="War Mages"
      value={army.mages}
      icon="🔮"
      color="text-mana"
    />
    <div className="text-xs text-bronze mt-2 font-parchment">
      Total Forces: {army.soldiers + army.archers + army.cavalry + army.mages}{" "}
      warriors
    </div>
  </div>
);

export const CommanderInfo: React.FC<CommanderInfoProps> = ({
  commander,
  canPerformActions = true,
  onAssign,
  onUnassign,
  availableNodes = [],
  className = "",
}) => {
  const commanderClass = gameData.commanderClasses[commander.class];
  const race = gameData.races[commander.race];

  const isAssigned = commander.assignedNode !== null;
  const healthPercentage = (commander.health / commander.maxHealth) * 100;

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-frontier font-bold mb-4 text-iron-dark text-battle-worn">
        ⚔ War Leader Profile
      </h3>

      {/* Commander Header */}
      <div className="flex items-center gap-3 p-3 bg-bronze-texture rounded-lg mb-4 border-2 border-bronze">
        <div className="text-2xl">{commanderClass.icon}</div>
        <div className="flex-1">
          <div className="font-frontier font-bold text-parchment-light">
            {commander.name}
          </div>
          <div className="text-xs text-parchment font-parchment">
            Level {commander.level} {race.name} {commanderClass.name}
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-xs px-3 py-1 rounded font-frontier font-bold border-2 ${
              isAssigned
                ? "bg-forest/20 text-forest border-forest"
                : "bg-iron/20 text-iron border-iron"
            }`}
          >
            {isAssigned ? "Deployed" : "Ready"}
          </div>
        </div>
      </div>

      {/* Health Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-parchment-dark font-parchment">
            🩸 Battle Wounds
          </span>
          <span className="font-frontier font-bold text-iron-dark">
            {commander.health}/{commander.maxHealth}
          </span>
        </div>
        <div className="w-full bg-iron-dark rounded-full h-3 border border-bronze">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              healthPercentage > 60
                ? "bg-forest animate-forge-flicker"
                : healthPercentage > 30
                  ? "bg-amber animate-ember-glow"
                  : "bg-blood animate-battle-shake"
            }`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-1 mb-4">
        <StatItem
          label="Battle Prowess"
          value={commander.attack}
          icon="⚔"
          color="text-blood"
        />
        <StatItem
          label="Tactical Defense"
          value={commander.defense}
          icon="🛡"
          color="text-mana"
        />
        <StatItem
          label="War Experience"
          value={commander.experience}
          icon="⭐"
          color="text-amber"
        />
      </div>

      {/* Army Composition */}
      <div className="mb-4">
        <ArmyComposition army={commander.army} />
      </div>

      {/* Special Ability */}
      <div className="mb-4 p-3 bg-crystal/20 rounded-lg border-2 border-crystal">
        <div className="text-sm font-frontier font-bold text-crystal mb-1">
          ✨ War Specialty
        </div>
        <div className="text-xs text-crystal-dark font-parchment">
          {commanderClass.specialAbility}
        </div>
      </div>

      {/* Assignment Status */}
      {isAssigned ? (
        <div className="space-y-2">
          <div className="text-sm text-parchment-dark font-parchment">
            🏰 Deployed to Stronghold #{commander.assignedNode}
          </div>
          {canPerformActions && onUnassign && (
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={onUnassign}
              leftIcon="↩"
              className="font-frontier font-bold"
            >
              Recall War Leader
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-parchment-dark mb-2 font-parchment">
            ⚔ War leader awaits deployment orders
          </div>
          {canPerformActions && availableNodes.length > 0 && onAssign && (
            <div className="space-y-1">
              {availableNodes.map((node) => (
                <Button
                  key={node.id}
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => onAssign(node.id)}
                  leftIcon="🏰"
                  className="font-frontier font-bold"
                >
                  Deploy to {node.name || `Stronghold ${node.id}`}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
