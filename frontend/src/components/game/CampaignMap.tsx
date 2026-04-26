import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { gameData } from '../../data/gameData';
import { canAttackNode as canAttackNodeByMap } from '../../utils/gameLogic';
import type { GameNode, NodeType, Owner } from '../../types/game';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

interface MapPoint {
  x: number;
  y: number;
}

interface MapRoute {
  from: GameNode;
  to: GameNode;
  id: string;
}

export const CampaignMap: React.FC = () => {
  const nodes = useGameStore(state => state.nodes);
  const selectedNode = useGameStore(state => state.selectedNode);
  const selectNode = useGameStore(state => state.selectNode);
  const getNodeCommanderInfo = useGameStore(state => state.getNodeCommanderInfo);

  const selectedNodeData = selectedNode
    ? (nodes.find(node => node.id === selectedNode) ?? null)
    : null;
  const routes = getUniqueRoutes(nodes);

  const handleStageClick = () => {
    selectNode(null);
  };

  return (
    <div className="campaign-map-shell frontier-map-frame">
      <div className="campaign-map-stage" onClick={handleStageClick}>
        <div className="campaign-map-terrain" />
        <div className="campaign-map-region campaign-map-region-reclaimed" />
        <div className="campaign-map-region campaign-map-region-wilds" />
        <div className="campaign-map-region campaign-map-region-corrupted" />
        <div className="campaign-map-river campaign-map-river-main" />
        <div className="campaign-map-river campaign-map-river-south" />
        <div className="campaign-map-mountains campaign-map-mountains-north" />
        <div className="campaign-map-mountains campaign-map-mountains-west" />

        <svg className="campaign-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="routeGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="0.9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {routes.map(route => {
            const from = toMapPoint(route.from);
            const to = toMapPoint(route.to);
            const isSelectedRoute =
              selectedNodeData !== null &&
              (route.from.id === selectedNodeData.id || route.to.id === selectedNodeData.id);
            const routeTone = getRouteTone(route.from, route.to, isSelectedRoute);

            return (
              <line
                key={route.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`campaign-map-route campaign-map-route-${routeTone}`}
                filter={isSelectedRoute ? 'url(#routeGlow)' : undefined}
              />
            );
          })}
        </svg>

        <div className="campaign-map-nodes">
          {nodes.map(node => {
            const point = toMapPoint(node);
            const isSelected = selectedNode === node.id;
            const isReachable = selectedNodeData?.connections.includes(node.id) ?? false;
            const isAttackable =
              selectedNodeData !== null && canAttackNodeByMap(nodes, selectedNodeData.id, node.id);
            const commanderInfo = getNodeCommanderInfo(node.id);

            return (
              <MapNodeBadge
                key={node.id}
                node={node}
                point={point}
                isSelected={isSelected}
                isReachable={isReachable}
                isAttackable={isAttackable}
                commanderCount={commanderInfo.current}
                onSelect={selectNode}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface MapNodeBadgeProps {
  node: GameNode;
  point: MapPoint;
  isSelected: boolean;
  isReachable: boolean;
  isAttackable: boolean;
  commanderCount: number;
  onSelect: (id: number | null) => void;
}

const MapNodeBadge: React.FC<MapNodeBadgeProps> = ({
  node,
  point,
  isSelected,
  isReachable,
  isAttackable,
  commanderCount,
  onSelect,
}) => {
  const nodeData = getNodeData(node.type);
  const title = node.display_name || node.name || nodeData.name;
  const ownerLabel = getOwnerLabel(node.owner);

  return (
    <button
      type="button"
      className={[
        'campaign-node',
        `campaign-node-${node.owner}`,
        node.biome ? `campaign-node-biome-${node.biome}` : '',
        isSelected ? 'campaign-node-selected' : '',
        isReachable ? 'campaign-node-reachable' : '',
        isAttackable ? 'campaign-node-attackable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      onClick={event => {
        event.stopPropagation();
        onSelect(isSelected ? null : node.id);
      }}
      aria-label={`Select ${title}`}
    >
      <span className="campaign-node-banner" />
      <span className="campaign-node-frame">
        <span className="campaign-node-art" data-node-type={node.type}>
          <span className="campaign-node-icon">{nodeData.icon}</span>
        </span>
      </span>
      <span className="campaign-node-name">{title}</span>
      <span className="campaign-node-meta">
        <span>{ownerLabel}</span>
        <span>{node.garrison}</span>
      </span>
      <span className="campaign-node-stars" aria-label={`${node.starLevel} star level`}>
        {Array.from({ length: 3 }, (_, index) => (
          <span key={index} className={index < node.starLevel ? 'is-lit' : ''}>
            *
          </span>
        ))}
      </span>
      {commanderCount > 0 && <span className="campaign-node-commanders">{commanderCount}</span>}
      {isAttackable && <span className="campaign-node-action">Assault</span>}
    </button>
  );
};

function getUniqueRoutes(nodes: GameNode[]): MapRoute[] {
  const nodeById = new Map(nodes.map(node => [node.id, node]));
  const seen = new Set<string>();
  const routes: MapRoute[] = [];

  nodes.forEach(node => {
    node.connections.forEach(connectionId => {
      const connectedNode = nodeById.get(connectionId);
      if (!connectedNode) return;

      const low = Math.min(node.id, connectionId);
      const high = Math.max(node.id, connectionId);
      const id = `${low}-${high}`;
      if (seen.has(id)) return;

      seen.add(id);
      routes.push({ id, from: node, to: connectedNode });
    });
  });

  return routes;
}

function toMapPoint(node: GameNode): MapPoint {
  return {
    x: (node.x / MAP_WIDTH) * 100,
    y: (node.y / MAP_HEIGHT) * 100,
  };
}

function getRouteTone(from: GameNode, to: GameNode, isSelected: boolean): string {
  if (isSelected) return 'selected';
  if (from.owner === 'enemy' || to.owner === 'enemy') return 'enemy';
  if (from.owner === 'player' || to.owner === 'player') return 'player';
  if (from.type === 'shrine' || to.type === 'shrine') return 'arcane';
  return 'neutral';
}

function getOwnerLabel(owner: Owner): string {
  const labels: Record<Owner, string> = {
    player: 'Reclaimed',
    enemy: 'Corrupted',
    neutral: 'Unclaimed',
    faction: 'Faction',
  };
  return labels[owner];
}

function getNodeData(type: NodeType) {
  return (
    gameData.nodeTypes[type as keyof typeof gameData.nodeTypes] ?? {
      name: 'Stronghold',
      icon: '◆',
      description: 'Strategic site',
      color: '#7b4f2e',
      goldGeneration: 0,
      suppliesGeneration: 0,
      manaGeneration: 0,
      defensiveBonus: 0,
    }
  );
}
