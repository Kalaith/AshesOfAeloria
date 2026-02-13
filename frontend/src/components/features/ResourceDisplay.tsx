/**
 * Resource Display Component
 * Pure presentational component for showing game resources
 */

import React from "react";
import { Card } from "../ui/Card";
import type { Resources } from "../../types/game";

type Income = Pick<Resources, "gold" | "supplies" | "mana">;

interface ResourceDisplayProps {
  resources: Resources;
  income?: Income;
  showIncome?: boolean;
  className?: string;
}

interface ResourceItemProps {
  icon: string;
  label: string;
  value: number;
  income?: number;
  showIncome?: boolean;
  color: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  icon,
  label,
  value,
  income,
  showIncome = false,
  color,
}) => (
  <div className="flex items-center justify-between py-2 px-3 bg-resource-item rounded-lg border border-bronze/40">
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-frontier font-bold text-dark-enhanced">
        {label}
      </span>
    </div>
    <div className="text-right">
      <div
        className={`text-lg font-frontier font-bold text-dark-enhanced ${color}`}
      >
        {value.toLocaleString()}
      </div>
      {showIncome && income !== undefined && income > 0 && (
        <div className="text-xs font-parchment text-dark-enhanced opacity-80">
          +{income}/campaign
        </div>
      )}
    </div>
  </div>
);

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  resources,
  income,
  showIncome = false,
  className = "",
}) => {
  const resourceItems = [
    {
      key: "gold",
      icon: "🪙",
      label: "War Coffers",
      value: resources.gold,
      income: income?.gold,
      color: "text-amber",
    },
    {
      key: "supplies",
      icon: "⚒",
      label: "War Supplies",
      value: resources.supplies,
      income: income?.supplies,
      color: "text-forest",
    },
    {
      key: "mana",
      icon: "🔮",
      label: "Arcane Power",
      value: resources.mana,
      income: income?.mana,
      color: "text-mana",
    },
  ];

  return (
    <Card className={`bg-card-enhanced p-4 ${className}`}>
      <h3 className="text-lg font-frontier font-bold mb-3 text-battle-worn">
        ⚖ Campaign Treasury
      </h3>
      <div className="space-y-2">
        {resourceItems.map((item) => (
          <ResourceItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            value={item.value}
            income={item.income}
            showIncome={showIncome}
            color={item.color}
          />
        ))}
      </div>
    </Card>
  );
};
