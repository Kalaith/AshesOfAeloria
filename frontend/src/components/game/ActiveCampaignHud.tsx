import React, { useState } from 'react';
import { campaignChapters, type CampaignChapter } from '../../data/campaignData';
import { gameData } from '../../data/gameData';
import { getAuthDisplayName } from '../../auth/session';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/useGameStore';
import { useGameActions } from '../../hooks/useGameActions';
import { calculateEffectiveGarrison, calculateIncome } from '../../utils/gameLogic';
import { useGameContext } from '../../providers/GameProvider';
import { Button } from '../ui/EnhancedButton';
import { GameCanvas } from './GameCanvas';
import type { BattleLogEntry, Commander, GameNode, NodeType, Owner, Resources } from '../../types/game';

interface ActiveCampaignHudProps {
  currentMission: string | null;
  onReturnToMissionSelect: () => void;
  onRestartMission: () => void;
  onRecruitClick: () => void;
  onHelpClick: () => void;
}

interface ResourceMetric {
  key: string;
  label: string;
  icon: string;
  value: number;
  income: number;
  tone: string;
}

const navItems = [
  { label: 'Army', symbol: 'A', panel: 'army' },
  { label: 'Commanders', symbol: 'C', panel: 'commanders' },
  { label: 'Inventory', symbol: 'I', panel: 'inventory' },
  { label: 'Relics', symbol: 'R', panel: 'relics' },
  { label: 'Journal', symbol: 'J', panel: 'journal' },
] as const;

type RailPanel = (typeof navItems)[number]['panel'];

export const ActiveCampaignHud: React.FC<ActiveCampaignHudProps> = ({
  currentMission,
  onReturnToMissionSelect,
  onRestartMission,
  onRecruitClick,
  onHelpClick,
}) => {
  const [activeRailPanel, setActiveRailPanel] = useState<RailPanel | null>(null);
  const { showSuccess, showError } = useGameContext();
  const { isAuthenticated, isGuest, user, visitWebHatcheryLogin, logoutGuest } = useAuthStore();
  const {
    turn,
    phase,
    resources,
    nodes,
    commanders,
    battleLog,
    globalTechnologies,
    achievements,
    events,
    historicalRecords,
    selectNode,
    resetGame,
  } = useGameStore();
  const {
    completeTurn,
    getSelectedNodeInfo,
    upgradeSelectedNode,
    initiateAttack,
    canPerformActions,
  } = useGameActions();

  const selectedNodeInfo = getSelectedNodeInfo();
  const currentChapterIndex = campaignChapters.findIndex(chapter => chapter.id === currentMission);
  const currentChapter = currentChapterIndex >= 0 ? campaignChapters[currentChapterIndex] : null;
  const income = calculateIncome(nodes);
  const playerNodeCount = nodes.filter(node => node.owner === 'player').length;
  const accountName =
    user?.display_name ||
    user?.username ||
    getAuthDisplayName() ||
    (isAuthenticated ? 'Web Hatchery' : 'Not signed in');

  const resourceMetrics: ResourceMetric[] = [
    {
      key: 'gold',
      label: 'Coffers',
      icon: 'G',
      value: resources.gold,
      income: income.gold,
      tone: 'gold',
    },
    {
      key: 'supplies',
      label: 'Supplies',
      icon: 'S',
      value: resources.supplies,
      income: income.supplies,
      tone: 'supply',
    },
    {
      key: 'mana',
      label: 'Arcana',
      icon: 'M',
      value: resources.mana,
      income: income.mana,
      tone: 'mana',
    },
    {
      key: 'commanders',
      label: 'Commanders',
      icon: 'C',
      value: commanders.filter(commander => commander.owner === 'player').length,
      income: commanders.filter(commander => commander.owner === 'enemy').length,
      tone: 'command',
    },
  ];

  const handleNavClick = (panel: RailPanel) => {
    setActiveRailPanel(currentPanel => (currentPanel === panel ? null : panel));
  };

  const handleUpgrade = async () => {
    const result = await upgradeSelectedNode();
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  };

  const handleAttack = async (nodeId: number) => {
    const result = await initiateAttack(nodeId);
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  };

  const handleEndTurn = () => {
    const result = completeTurn();
    showSuccess(result.message);
  };

  const handleReset = () => {
    const confirmed = window.confirm('Reset this campaign and return to the first mission?');
    if (confirmed) {
      void resetGame();
    }
  };

  return (
    <div className="campaign-hud">
      <TopResourceBar
        currentChapter={currentChapter}
        currentChapterIndex={currentChapterIndex}
        accountLabel={isGuest ? `Guest: ${accountName}` : `Account: ${accountName}`}
        resourceMetrics={resourceMetrics}
        isAuthenticated={isAuthenticated}
        isGuest={isGuest}
        onLogin={() => void visitWebHatcheryLogin()}
        onLogoutGuest={logoutGuest}
        onReturnToMissionSelect={onReturnToMissionSelect}
        onRestartMission={onRestartMission}
        onResetCampaign={handleReset}
      />

      <CampaignReachPanel
        playerNodeCount={playerNodeCount}
        totalNodeCount={nodes.length}
        currentChapter={currentChapter}
      />

      <aside className="campaign-hud-rail" aria-label="Campaign tools">
        {navItems.map(item => (
          <button
            key={item.label}
            type="button"
            className={`campaign-hud-rail-button ${activeRailPanel === item.panel ? 'is-active' : ''}`}
            onClick={() => handleNavClick(item.panel)}
            title={item.label}
          >
            <span>{item.symbol}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </aside>

      {activeRailPanel ? (
        <RailDrawer
          activePanel={activeRailPanel}
          commanders={commanders}
          nodes={nodes}
          resources={resources}
          battleLog={battleLog}
          globalTechnologies={globalTechnologies}
          achievements={achievements}
          events={events}
          historicalRecords={historicalRecords}
          currentChapter={currentChapter}
          onClose={() => setActiveRailPanel(null)}
          onRecruitClick={onRecruitClick}
          onHelpClick={onHelpClick}
          onFocusNode={nodeId => {
            selectNode(nodeId);
            setActiveRailPanel(null);
          }}
        />
      ) : null}

      <main className="campaign-hud-map" aria-label="Campaign map">
        <GameCanvas />
      </main>

      <SelectedNodePanel
        nodeInfo={selectedNodeInfo}
        currentChapter={currentChapter}
        canPerformActions={canPerformActions}
        onUpgrade={() => void handleUpgrade()}
        onAttack={nodeId => void handleAttack(nodeId)}
      />

      <CommanderSummary commanders={commanders} />

      <ChapterProgressBar currentMission={currentMission} />

      <TurnControl
        turn={turn}
        phase={phase}
        playerNodeCount={playerNodeCount}
        totalNodeCount={nodes.length}
        canEndTurn={canPerformActions}
        onEndTurn={handleEndTurn}
      />
    </div>
  );
};

interface RailDrawerProps {
  activePanel: RailPanel;
  commanders: Commander[];
  nodes: GameNode[];
  resources: Resources;
  battleLog: BattleLogEntry[];
  globalTechnologies: string[];
  achievements: unknown[];
  events: unknown[];
  historicalRecords: unknown[];
  currentChapter: CampaignChapter | null;
  onClose: () => void;
  onRecruitClick: () => void;
  onHelpClick: () => void;
  onFocusNode: (nodeId: number) => void;
}

const RailDrawer: React.FC<RailDrawerProps> = ({
  activePanel,
  commanders,
  nodes,
  resources,
  battleLog,
  globalTechnologies,
  achievements,
  events,
  historicalRecords,
  currentChapter,
  onClose,
  onRecruitClick,
  onHelpClick,
  onFocusNode,
}) => {
  const title = navItems.find(item => item.panel === activePanel)?.label ?? 'Campaign';

  return (
    <section className="campaign-rail-drawer" aria-label={`${title} panel`}>
      <header className="campaign-rail-drawer-header">
        <div>
          <span>War Council</span>
          <h2>{title}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close panel">
          Close
        </button>
      </header>

      {activePanel === 'army' ? (
        <ArmyPanel commanders={commanders} nodes={nodes} battleLog={battleLog} onRecruitClick={onRecruitClick} />
      ) : null}
      {activePanel === 'commanders' ? (
        <CommandersPanel
          commanders={commanders}
          nodes={nodes}
          onRecruitClick={onRecruitClick}
          onFocusNode={onFocusNode}
        />
      ) : null}
      {activePanel === 'inventory' ? <InventoryPanel resources={resources} onHelpClick={onHelpClick} /> : null}
      {activePanel === 'relics' ? (
        <RelicsPanel
          globalTechnologies={globalTechnologies}
          achievements={achievements}
          historicalRecords={historicalRecords}
        />
      ) : null}
      {activePanel === 'journal' ? (
        <JournalPanel currentChapter={currentChapter} events={events} battleLog={battleLog} />
      ) : null}
    </section>
  );
};

interface ArmyPanelProps {
  commanders: Commander[];
  nodes: GameNode[];
  battleLog: BattleLogEntry[];
  onRecruitClick: () => void;
}

const ArmyPanel: React.FC<ArmyPanelProps> = ({ commanders, nodes, battleLog, onRecruitClick }) => {
  const playerCommanders = commanders.filter(commander => commander.owner === 'player');
  const armyTotals = playerCommanders.reduce(
    (totals, commander) => ({
      soldiers: totals.soldiers + commander.army.soldiers,
      archers: totals.archers + commander.army.archers,
      cavalry: totals.cavalry + commander.army.cavalry,
      mages: totals.mages + commander.army.mages,
    }),
    { soldiers: 0, archers: 0, cavalry: 0, mages: 0 }
  );
  const controlledNodes = nodes.filter(node => node.owner === 'player');

  return (
    <div className="campaign-rail-content">
      <div className="campaign-stat-grid">
        <DrawerStat label="War Leaders" value={playerCommanders.length} />
        <DrawerStat label="Strongholds" value={controlledNodes.length} />
        <DrawerStat label="Soldiers" value={armyTotals.soldiers} />
        <DrawerStat label="Archers" value={armyTotals.archers} />
        <DrawerStat label="Cavalry" value={armyTotals.cavalry} />
        <DrawerStat label="Mages" value={armyTotals.mages} />
      </div>

      <button type="button" className="campaign-drawer-primary" onClick={onRecruitClick}>
        Enlist War Leader
      </button>

      <DrawerSection title="Recent War Log">
        {battleLog.slice(-4).reverse().map(entry => (
          <LogEntry key={`${entry.timestamp}-${entry.message}`} entry={entry} />
        ))}
      </DrawerSection>
    </div>
  );
};

interface CommandersPanelProps {
  commanders: Commander[];
  nodes: GameNode[];
  onRecruitClick: () => void;
  onFocusNode: (nodeId: number) => void;
}

const CommandersPanel: React.FC<CommandersPanelProps> = ({
  commanders,
  nodes,
  onRecruitClick,
  onFocusNode,
}) => {
  const playerCommanders = commanders.filter(commander => commander.owner === 'player');

  return (
    <div className="campaign-rail-content">
      <button type="button" className="campaign-drawer-primary" onClick={onRecruitClick}>
        Recruit Commander
      </button>

      <div className="campaign-drawer-list">
        {playerCommanders.map(commander => {
          const assignedNode =
            commander.assignedNode !== null
              ? nodes.find(node => node.id === commander.assignedNode)
              : null;

          return (
            <article key={commander.id} className="campaign-drawer-card">
              <div className="campaign-drawer-card-mark">
                {getCommanderClassIcon(commander.class)}
              </div>
              <div>
                <h3>{commander.name}</h3>
                <p>
                  Lv. {commander.level} {getCommanderClassName(commander.class)}
                </p>
                <div className="campaign-mini-meter">
                  <span
                    className={`campaign-mini-meter-fill campaign-mini-meter-fill-${Math.min(
                      10,
                      Math.floor((commander.health / commander.maxHealth) * 10)
                    )}`}
                  />
                </div>
                <small>
                  {assignedNode ? `Assigned to ${assignedNode.name || getNodeData(assignedNode.type).name}` : 'Awaiting orders'}
                </small>
              </div>
              {assignedNode ? (
                <button type="button" onClick={() => onFocusNode(assignedNode.id)}>
                  Focus
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
};

const InventoryPanel: React.FC<{ resources: Resources; onHelpClick: () => void }> = ({
  resources,
  onHelpClick,
}) => (
  <div className="campaign-rail-content">
    <div className="campaign-stat-grid">
      <DrawerStat label="Materials" value={resources.materials} />
      <DrawerStat label="Food" value={resources.food} />
      <DrawerStat label="Knowledge" value={resources.knowledge} />
      <DrawerStat label="Culture" value={resources.culture} />
      <DrawerStat label="Influence" value={resources.influence} />
      <DrawerStat label="Artifacts" value={resources.artifacts} />
    </div>
    <DrawerSection title="Quartermaster Notes">
      <p className="campaign-drawer-copy">
        Strategic inventory systems are staged for campaign expansion. Current stores are tracked
        by the backend and surfaced here for planning.
      </p>
      <button type="button" className="campaign-drawer-secondary" onClick={onHelpClick}>
        Open War Manual
      </button>
    </DrawerSection>
  </div>
);

interface RelicsPanelProps {
  globalTechnologies: string[];
  achievements: unknown[];
  historicalRecords: unknown[];
}

const RelicsPanel: React.FC<RelicsPanelProps> = ({
  globalTechnologies,
  achievements,
  historicalRecords,
}) => (
  <div className="campaign-rail-content">
    <div className="campaign-stat-grid">
      <DrawerStat label="Technologies" value={globalTechnologies.length} />
      <DrawerStat label="Achievements" value={achievements.length} />
      <DrawerStat label="Records" value={historicalRecords.length} />
    </div>
    <DrawerSection title="Recovered Knowledge">
      {globalTechnologies.length > 0 ? (
        globalTechnologies.slice(0, 6).map(technology => (
          <div key={technology} className="campaign-drawer-row">
            <span>{formatIdentifier(technology)}</span>
          </div>
        ))
      ) : (
        <p className="campaign-drawer-copy">
          No relics or technologies have been secured yet. Capture shrines and resolve story events
          to recover Aeloria's lost inheritance.
        </p>
      )}
    </DrawerSection>
  </div>
);

interface JournalPanelProps {
  currentChapter: CampaignChapter | null;
  events: unknown[];
  battleLog: BattleLogEntry[];
}

const JournalPanel: React.FC<JournalPanelProps> = ({ currentChapter, events, battleLog }) => (
  <div className="campaign-rail-content">
    <DrawerSection title={currentChapter?.title ?? 'Campaign Journal'}>
      <p className="campaign-drawer-copy">
        {currentChapter?.description ?? 'No active chapter briefing is available.'}
      </p>
    </DrawerSection>
    <DrawerSection title="Objectives">
      {currentChapter?.victoryConditions.slice(0, 5).map(condition => (
        <div key={condition.id} className="campaign-drawer-row">
          <span>{condition.description}</span>
          <strong>{condition.completed ? 'Done' : condition.optional ? 'Optional' : 'Open'}</strong>
        </div>
      ))}
    </DrawerSection>
    <DrawerSection title={`Active Events (${events.length})`}>
      {battleLog.slice(-5).reverse().map(entry => (
        <LogEntry key={`${entry.timestamp}-${entry.message}`} entry={entry} />
      ))}
    </DrawerSection>
  </div>
);

const DrawerSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="campaign-drawer-section">
    <h3>{title}</h3>
    {children}
  </section>
);

const DrawerStat: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="campaign-drawer-stat">
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const LogEntry: React.FC<{ entry: BattleLogEntry }> = ({ entry }) => (
  <div className={`campaign-log-entry campaign-log-entry-${entry.type}`}>
    <strong>{entry.type}</strong>
    <p>{entry.message}</p>
  </div>
);

interface TopResourceBarProps {
  currentChapter: CampaignChapter | null;
  currentChapterIndex: number;
  accountLabel: string;
  resourceMetrics: ResourceMetric[];
  isAuthenticated: boolean;
  isGuest: boolean;
  onLogin: () => void;
  onLogoutGuest: () => void;
  onReturnToMissionSelect: () => void;
  onRestartMission: () => void;
  onResetCampaign: () => void;
}

const TopResourceBar: React.FC<TopResourceBarProps> = ({
  currentChapter,
  currentChapterIndex,
  accountLabel,
  resourceMetrics,
  isAuthenticated,
  isGuest,
  onLogin,
  onLogoutGuest,
  onReturnToMissionSelect,
  onRestartMission,
  onResetCampaign,
}) => (
  <header className="campaign-hud-topbar">
    <div className="campaign-hud-title">
      <div className="campaign-hud-compass">✦</div>
      <div>
        <h1>Ashes of Aeloria</h1>
        <p>
          {currentChapter
            ? `Chapter ${toRoman(Math.max(1, currentChapterIndex + 1))} - ${currentChapter.subtitle}`
            : 'Campaign Operations'}
        </p>
      </div>
    </div>

    <div className="campaign-hud-resources" aria-label="Campaign resources">
      {resourceMetrics.map(metric => (
        <div key={metric.key} className={`campaign-hud-resource campaign-hud-resource-${metric.tone}`}>
          <span className="campaign-hud-resource-icon">{metric.icon}</span>
          <span className="campaign-hud-resource-label">{metric.label}</span>
          <span className="campaign-hud-resource-value">{metric.value.toLocaleString()}</span>
          <span className="campaign-hud-resource-income">
            {metric.key === 'commanders'
              ? `${metric.income} enemy`
              : `${metric.income >= 0 ? '+' : ''}${metric.income}`}
          </span>
        </div>
      ))}
    </div>

    <div className="campaign-hud-actions">
      <span className="campaign-hud-account">{accountLabel}</span>
      {isGuest ? (
        <button type="button" onClick={onLogoutGuest} title="Exit guest campaign">
          Exit Guest
        </button>
      ) : null}
      {!isAuthenticated && !isGuest ? (
        <button type="button" onClick={onLogin} title="Sign in with Web Hatchery">
          Sign In
        </button>
      ) : null}
      <button type="button" onClick={onReturnToMissionSelect}>
        Missions
      </button>
      <button type="button" onClick={onRestartMission}>
        Restart
      </button>
      <button type="button" className="is-danger" onClick={onResetCampaign}>
        Reset
      </button>
    </div>
  </header>
);

interface CampaignReachPanelProps {
  playerNodeCount: number;
  totalNodeCount: number;
  currentChapter: CampaignChapter | null;
}

const CampaignReachPanel: React.FC<CampaignReachPanelProps> = ({
  playerNodeCount,
  totalNodeCount,
  currentChapter,
}) => {
  const reach = totalNodeCount > 0 ? Math.round((playerNodeCount / totalNodeCount) * 100) : 0;

  return (
    <aside className="campaign-reach-panel">
      <div className="campaign-reach-banner">A</div>
      <div className="campaign-reach-content">
        <span>Your Reach</span>
        <strong>{reach}%</strong>
        <div className="campaign-reach-meter">
          <span className={`campaign-reach-fill campaign-reach-fill-${Math.min(10, Math.floor(reach / 10))}`} />
        </div>
        <dl>
          <div>
            <dt>Reclaimed Nodes</dt>
            <dd>
              {playerNodeCount}/{totalNodeCount}
            </dd>
          </div>
          <div>
            <dt>Campaign Points</dt>
            <dd>{currentChapter?.starRating ?? 0}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
};

interface SelectedNodePanelProps {
  nodeInfo: ReturnType<ReturnType<typeof useGameActions>['getSelectedNodeInfo']>;
  currentChapter: CampaignChapter | null;
  canPerformActions: boolean;
  onUpgrade: () => void;
  onAttack: (nodeId: number) => void;
}

const SelectedNodePanel: React.FC<SelectedNodePanelProps> = ({
  nodeInfo,
  currentChapter,
  canPerformActions,
  onUpgrade,
  onAttack,
}) => {
  if (!nodeInfo) {
    return (
      <aside className="campaign-node-intel campaign-node-intel-empty">
        <div className="campaign-node-intel-kicker">Mission Briefing</div>
        <h2>{currentChapter?.title ?? 'Campaign Intel'}</h2>
        <p className="campaign-node-intel-copy">
          {currentChapter?.coreChallenge ??
            'Select a stronghold on the map to inspect garrison strength, rewards, and available orders.'}
        </p>
        {currentChapter ? (
          <div className="campaign-objective-list">
            <span>Objectives</span>
            {currentChapter.victoryConditions.slice(0, 4).map(condition => (
              <div key={condition.id} className={condition.completed ? 'is-complete' : ''}>
                <strong>{condition.completed ? 'Done' : condition.optional ? 'Optional' : 'Goal'}</strong>
                <p>{condition.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </aside>
    );
  }

  const nodeData = getNodeData(nodeInfo.node.type);
  const effectiveGarrison = calculateEffectiveGarrison(
    nodeInfo.node,
    nodeInfo.commanderInfo.commanders
  );
  const threatLevel = getThreatLevel(nodeInfo.node);
  const attackTargets = nodeInfo.node.owner === 'player' ? nodeInfo.attackableNodes : [];

  return (
    <aside className={`campaign-node-intel campaign-node-intel-${nodeInfo.node.owner}`}>
      <div className="campaign-node-intel-kicker">{getOwnerLabel(nodeInfo.node.owner)}</div>
      <h2>{nodeInfo.node.name || nodeData.name}</h2>
      <p className="campaign-node-intel-type">{nodeData.name}</p>

      <div className="campaign-node-intel-art">
        <span>{nodeData.icon}</span>
      </div>

      <p className="campaign-node-intel-copy">
        {nodeInfo.node.description || nodeData.description}
      </p>

      <div className="campaign-node-intel-stats">
        <NodeIntelStat label="Garrison" value={effectiveGarrison.totalPower} />
        <NodeIntelStat label="Star Level" value={nodeInfo.node.starLevel} />
        <NodeIntelStat
          label="Commanders"
          value={`${nodeInfo.commanderInfo.current}/${nodeInfo.commanderInfo.max}`}
        />
        <NodeIntelStat label="Threat" value={threatLevel} />
      </div>

      <div className="campaign-node-intel-rewards">
        <span>Rewards</span>
        <div>
          <RewardPill label="Gold" value={nodeData.goldGeneration} />
          <RewardPill label="Supplies" value={nodeData.suppliesGeneration} />
          <RewardPill label="Mana" value={nodeData.manaGeneration} />
        </div>
      </div>

      <div className="campaign-node-intel-orders">
        {nodeInfo.node.owner === 'player' && nodeInfo.upgradeInfo.canUpgrade ? (
          <Button variant="primary" fullWidth onClick={onUpgrade} disabled={!canPerformActions}>
            Fortify Stronghold
          </Button>
        ) : null}
        {attackTargets.map(target => (
          <Button
            key={target.id}
            variant="danger"
            fullWidth
            onClick={() => onAttack(target.id)}
            disabled={!canPerformActions}
          >
            Assault {target.name || getNodeData(target.type).name}
          </Button>
        ))}
        {!nodeInfo.upgradeInfo.canUpgrade && attackTargets.length === 0 ? (
          <div className="campaign-node-intel-note">No immediate orders available.</div>
        ) : null}
      </div>
    </aside>
  );
};

const NodeIntelStat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const RewardPill: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="campaign-node-reward">
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

interface CommanderSummaryProps {
  commanders: ReturnType<typeof useGameStore.getState>['commanders'];
}

const CommanderSummary: React.FC<CommanderSummaryProps> = ({ commanders }) => {
  const playerCommander = commanders.find(commander => commander.owner === 'player') ?? null;

  return (
    <section className="campaign-commander-summary">
      <div className="campaign-commander-portrait">{playerCommander ? '◆' : '?'}</div>
      <div>
        <h2>{playerCommander?.name ?? 'No Commander'}</h2>
        <p>
          {playerCommander
            ? `Lv. ${playerCommander.level} ${getCommanderClassName(playerCommander.class)}`
            : 'Recruit a war leader'}
        </p>
        <div className="campaign-commander-health">
          <span
            style={{
              width: playerCommander
                ? `${Math.max(0, Math.min(100, (playerCommander.health / playerCommander.maxHealth) * 100))}%`
                : '0%',
            }}
          />
        </div>
      </div>
    </section>
  );
};

const ChapterProgressBar: React.FC<{ currentMission: string | null }> = ({ currentMission }) => {
  const currentIndex = Math.max(
    0,
    campaignChapters.findIndex(chapter => chapter.id === currentMission)
  );

  return (
    <nav className="campaign-chapter-strip" aria-label="Campaign chapters">
      {campaignChapters.slice(0, 6).map((chapter, index) => {
        const isCurrent = chapter.id === currentMission;
        const isUnlocked = index <= currentIndex;

        return (
          <div
            key={chapter.id}
            className={[
              'campaign-chapter-step',
              isCurrent ? 'is-current' : '',
              isUnlocked ? 'is-unlocked' : 'is-locked',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <strong>{toRoman(index + 1)}</strong>
            <span>{chapter.title}</span>
          </div>
        );
      })}
    </nav>
  );
};

interface TurnControlProps {
  turn: number;
  phase: string;
  playerNodeCount: number;
  totalNodeCount: number;
  canEndTurn: boolean;
  onEndTurn: () => void;
}

const TurnControl: React.FC<TurnControlProps> = ({
  turn,
  phase,
  playerNodeCount,
  totalNodeCount,
  canEndTurn,
  onEndTurn,
}) => (
  <section className="campaign-turn-control">
    <div>
      <span>Turn</span>
      <strong>{turn.toString().padStart(3, '0')}</strong>
    </div>
    <p>{playerNodeCount}/{totalNodeCount} reclaimed</p>
    <button type="button" onClick={onEndTurn} disabled={!canEndTurn || phase !== 'player'}>
      End Turn
    </button>
  </section>
);

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

function getOwnerLabel(owner: Owner): string {
  const labels: Record<Owner, string> = {
    player: 'Reclaimed',
    enemy: 'Corrupted',
    neutral: 'Unclaimed',
    faction: 'Faction',
  };
  return labels[owner];
}

function getThreatLevel(node: GameNode): string {
  if (node.owner === 'enemy' && node.garrison >= 180) return 'High';
  if (node.garrison >= 100) return 'Medium';
  return 'Low';
}

function getCommanderClassName(className: string): string {
  return (
    gameData.commanderClasses[className as keyof typeof gameData.commanderClasses]?.name ??
    'Commander'
  );
}

function getCommanderClassIcon(className: string): string {
  return gameData.commanderClasses[className as keyof typeof gameData.commanderClasses]?.icon ?? '◆';
}

function formatIdentifier(value: string): string {
  return value
    .split(/[_-]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function toRoman(value: number): string {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return numerals[value - 1] ?? String(value);
}
