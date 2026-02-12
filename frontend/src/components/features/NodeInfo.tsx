/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * Node Information Display Component
 * Shows detailed information about selected nodes
 */

import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/EnhancedButton';
import { GAME_DATA } from '../../data/gameData';
import { calculateEffectiveGarrison } from '../../utils/gameLogic';
import type { GameNode, Resources } from '../../types/game';

interface NodeInfoProps {
  node: GameNode;
  canUpgrade?: boolean;
  upgradeCost?: number;
  onUpgrade?: () => void;
  onAttack?: (nodeId: number) => void;
  attackableNodes?: GameNode[];
  commanderInfo?: {
    current: number;
    max: number;
    commanders: any[];
  };
  className?: string;
}

interface NodeStatProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

const NodeStat: React.FC<NodeStatProps> = ({ label, value, icon, color = 'text-iron-dark' }) => (
  <div className="flex justify-between items-center py-1 px-2 bg-bronze/5 rounded border border-bronze/20">
    <span className="text-sm text-parchment-dark font-parchment flex items-center gap-1">
      {icon && <span>{icon}</span>}
      {label}:
    </span>
    <span className={`text-sm font-frontier font-bold ${color}`}>
      {value}
    </span>
  </div>
);

const OwnerBadge: React.FC<{ owner: string }> = ({ owner }) => {
  const colorClasses = {
    player: 'bg-forest/20 text-forest border-forest',
    enemy: 'bg-blood/20 text-blood border-blood',
    neutral: 'bg-iron/20 text-iron border-iron'
  }[owner] || 'bg-iron/20 text-iron border-iron';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-frontier font-bold border-2 ${colorClasses}`}>
      {owner.charAt(0).toUpperCase() + owner.slice(1)}
    </span>
  );
};

export const NodeInfo: React.FC<NodeInfoProps> = ({
  node,
  canUpgrade = false,
  upgradeCost,
  onUpgrade,
  onAttack,
  attackableNodes = [],
  commanderInfo,
  className = ''
}) => {
  const nodeTypeData = GAME_DATA.nodeTypes[node.type];
  
  // Calculate effective garrison with commander bonuses
  const effectiveGarrison = commanderInfo ? 
    calculateEffectiveGarrison(node, commanderInfo.commanders) : 
    { baseGarrison: node.garrison, commanderBonus: 0, totalPower: node.garrison };

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-frontier font-bold mb-4 text-iron-dark text-battle-worn">🏰 Stronghold Details</h3>
      
      {/* Node Header */}
      <div className="flex items-center gap-3 p-3 bg-bronze-texture rounded-lg mb-4 border-2 border-bronze">
        <span className="text-2xl">{nodeTypeData.icon}</span>
        <div className="flex-1">
          <div className="font-frontier font-bold text-parchment-light">{nodeTypeData.name}</div>
          <div className="text-xs text-parchment font-parchment">{nodeTypeData.description}</div>
        </div>
        <OwnerBadge owner={node.owner} />
      </div>

      {/* Node Stats */}
      <div className="space-y-1 mb-4">
        <NodeStat label="Star Level" value={node.starLevel} icon="⭐" />
        
        {/* Enhanced Garrison Display */}
        {effectiveGarrison.commanderBonus > 0 ? (
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <span>🛡️</span>
              Garrison:
            </span>
            <div className="text-sm">
              <span className="font-medium text-gray-900">
                {effectiveGarrison.totalPower}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({effectiveGarrison.baseGarrison} + {effectiveGarrison.commanderBonus})
              </span>
            </div>
          </div>
        ) : (
          <NodeStat label="Garrison" value={node.garrison} icon="🛡️" />
        )}
        
        <NodeStat
          label="War Coffers/Campaign"
          value={nodeTypeData.goldGeneration}
          icon="🪙"
          color="text-amber"
        />
        <NodeStat
          label="War Supplies/Campaign"
          value={nodeTypeData.suppliesGeneration}
          icon="⚒"
          color="text-forest"
        />
        <NodeStat
          label="Arcane Power/Campaign"
          value={nodeTypeData.manaGeneration}
          icon="🔮"
          color="text-mana"
        />
      </div>

      {/* Commander Information */}
      {commanderInfo && (
        <div className="mb-4">
          <NodeStat
            label="War Leaders"
            value={`${commanderInfo.current}/${commanderInfo.max}`}
            icon="⚔"
          />
          {effectiveGarrison.commanderBonus > 0 && (
            <div className="text-xs text-crystal mt-1 ml-5 font-frontier font-bold">
              Battle Bonus: +{effectiveGarrison.commanderBonus}
            </div>
          )}
        </div>
      )}

      {/* Player Actions */}
      {node.owner === 'player' && (
        <div className="space-y-2">
          {/* Upgrade Button */}
          {canUpgrade && onUpgrade && (
            <div>
              <Button
                variant="recruit"
                fullWidth
                onClick={onUpgrade}
                leftIcon="⬆"
                className="font-frontier font-bold"
              >
                Fortify Stronghold
              </Button>
              {upgradeCost && (
                <div className="text-xs text-bronze mt-1 text-center font-parchment">
                  Cost: {upgradeCost} 🪙
                </div>
              )}
            </div>
          )}

          {/* Attack Options */}
          {attackableNodes.length > 0 && onAttack && (
            <div>
              <div className="text-sm font-frontier font-bold text-iron-dark mb-2 text-battle-worn">
                ⚔ Assault Targets:
              </div>
              <div className="space-y-1">
                {attackableNodes.map(target => (
                  <Button
                    key={target.id}
                    variant="attack"
                    size="sm"
                    fullWidth
                    onClick={() => onAttack(target.id)}
                    leftIcon="⚔"
                    className="font-frontier font-bold"
                  >
                    Assault {GAME_DATA.nodeTypes[target.type].name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enemy/Neutral Node Info */}
      {node.owner !== 'player' && (
        <div className="text-center text-sm text-parchment-dark italic font-parchment">
          {node.owner === 'enemy' ? '⛔ Enemy-held territory' : '🏳 Neutral lands'}
        </div>
      )}
    </Card>
  );
};

