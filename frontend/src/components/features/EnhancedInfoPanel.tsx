/**
 * Enhanced Info Panel Component
 * Clean, modular implementation following frontend standards
 */

import React from 'react';
import { NodeInfo } from '../features/NodeInfo';
import { CommanderInfo } from '../features/CommanderInfo';
import { Card } from '../ui/Card';
import { useGameActions } from '../../hooks/useGameActions';
import { useGameContext } from '../../providers/GameProvider';

export const EnhancedInfoPanel: React.FC = () => {
  const {
    getSelectedNodeInfo,
    getSelectedCommanderInfo,
    upgradeSelectedNode,
    initiateAttack,
    canPerformActions,
  } = useGameActions();

  const { showSuccess, showError } = useGameContext();

  const nodeInfo = getSelectedNodeInfo();
  const commanderInfo = getSelectedCommanderInfo();

  const handleUpgrade = async () => {
    if (!canPerformActions) {
      showError('Cannot perform actions during enemy turn');
      return;
    }

    const result = upgradeSelectedNode();
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  };

  const handleAttack = async (nodeId: number) => {
    if (!canPerformActions) {
      showError('Cannot perform actions during enemy turn');
      return;
    }

    const result = initiateAttack(nodeId);
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  };

  // Show empty state when nothing is selected
  if (!nodeInfo && !commanderInfo) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-frontier font-bold mb-4 text-iron-dark text-battle-worn">
          🗺 Battlefield Intelligence
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-parchment-dark text-sm font-parchment">
            Choose a stronghold or war leader to view tactical details and command options.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Node Information */}
      {nodeInfo && (
        <NodeInfo
          node={nodeInfo.node}
          canUpgrade={nodeInfo.upgradeInfo.canUpgrade}
          upgradeCost={nodeInfo.upgradeInfo.cost}
          onUpgrade={handleUpgrade}
          onAttack={handleAttack}
          attackableNodes={nodeInfo.attackableNodes}
          commanderInfo={nodeInfo.commanderInfo}
        />
      )}

      {/* Commander Information */}
      {commanderInfo && (
        <CommanderInfo commander={commanderInfo} canPerformActions={canPerformActions} />
      )}
    </div>
  );
};
