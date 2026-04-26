<?php

declare(strict_types=1);

namespace App\Services;

use DomainException;

// phpcs:disable Generic.Files.LineLength.TooLong

final class GameEngineService
{
    private const COMMANDER_CLASSES = [
        'knight' => ['health' => 120, 'attack' => 80, 'defense' => 100, 'cost' => 200],
        'mage' => ['health' => 80, 'attack' => 120, 'defense' => 60, 'cost' => 250],
        'ranger' => ['health' => 100, 'attack' => 100, 'defense' => 80, 'cost' => 180],
        'warlord' => ['health' => 110, 'attack' => 90, 'defense' => 90, 'cost' => 300],
        'scholar' => ['health' => 70, 'attack' => 60, 'defense' => 70, 'cost' => 220],
        'engineer' => ['health' => 90, 'attack' => 70, 'defense' => 85, 'cost' => 240],
        'diplomat' => ['health' => 85, 'attack' => 65, 'defense' => 75, 'cost' => 200],
        'explorer' => ['health' => 95, 'attack' => 85, 'defense' => 70, 'cost' => 190],
        'architect' => ['health' => 100, 'attack' => 75, 'defense' => 90, 'cost' => 280],
        'healer' => ['health' => 75, 'attack' => 50, 'defense' => 80, 'cost' => 210],
    ];

    private const NODE_TYPES = [
        'city' => ['gold' => 100, 'supplies' => 50, 'mana' => 0, 'capacity' => 3, 'name' => 'City'],
        'resource' => ['gold' => 50, 'supplies' => 100, 'mana' => 25, 'capacity' => 2, 'name' => 'Resource Node'],
        'fortress' => ['gold' => 25, 'supplies' => 25, 'mana' => 0, 'capacity' => 4, 'name' => 'Fortress'],
        'shrine' => ['gold' => 0, 'supplies' => 0, 'mana' => 100, 'capacity' => 2, 'name' => 'Shrine'],
        'stronghold' => ['gold' => 150, 'supplies' => 75, 'mana' => 50, 'capacity' => 5, 'name' => 'Enemy Stronghold'],
    ];

    public function initialState(): array
    {
        $nodes = $this->initialNodes();
        $commanders = [
            $this->createCommander(1, 'knight', 'human', 'player', 1),
            $this->createCommander(1000, 'knight', 'orc', 'enemy', 7),
            $this->createCommander(1001, 'mage', 'orc', 'enemy', 8),
        ];

        return [
            'turn' => 1,
            'phase' => 'player',
            'resources' => $this->baseResources(),
            'commanders' => $commanders,
            'nodes' => $nodes,
            'selectedNode' => null,
            'selectedCommander' => null,
            'gameOver' => false,
            'winner' => null,
            'currentMission' => null,
            'missionStarted' => false,
            'battleLog' => [[
                'timestamp' => $this->nowMs(),
                'type' => 'info',
                'message' => 'Welcome to the world of Ashes of Aeloria! The great civilization has fallen, but from its ashes, you will rebuild.',
            ]],
            'globalTechnologies' => [],
            'worldState' => ['corruptionLevel' => 25, 'restorationProgress' => 0],
            'factions' => [],
            'diplomacy' => [
                'playerFactionRelations' => [],
                'factionRelations' => [],
                'activeNegotiations' => [],
                'treaties' => [],
                'tradeAgreements' => [],
                'militaryAlliances' => [],
                'nonAggressionPacts' => [],
                'diplomaticHistory' => [],
            ],
            'market' => ['prices' => [], 'supply' => [], 'demand' => [], 'trends' => [], 'tradeRoutes' => [], 'merchants' => [], 'marketEvents' => [], 'economicIndicators' => []],
            'calendar' => ['currentSeason' => 'spring', 'currentMonth' => 1, 'currentDay' => 1, 'currentYear' => 1, 'daysSinceStart' => 0, 'seasonalEvents' => [], 'holidays' => [], 'astronomicalEvents' => [], 'culturalCalendars' => []],
            'weather' => ['currentWeather' => 'clear', 'forecast' => [], 'activeEffects' => []],
            'events' => [],
            'eventQueue' => [],
            'narrativeState' => ['playerChoices' => [], 'activeArcs' => [], 'completedArcs' => [], 'worldNarratives' => []],
            'achievements' => [],
            'statistics' => ['turnCount' => 1, 'totalCommanders' => 3, 'totalBuildings' => 0, 'totalPopulation' => 0],
            'victoryProgress' => [],
            'legacyData' => [],
            'historicalRecords' => [],
            'culturalMovements' => [],
            'economicCycles' => [],
            'research' => ['completedTechnologies' => [], 'activeProjects' => [], 'scholarNetwork' => ['scholars' => []]],
            'exploration' => ['expeditions' => [], 'discoveredRuins' => [], 'artifacts' => [], 'mysteries' => []],
            'magicalCorruption' => ['level' => 25, 'sources' => [], 'cleansedAreas' => []],
            'populationCenters' => [],
            'tradeNetworks' => [],
            'politicalSituation' => [],
            'militaryIntelligence' => [],
            'culturalRenaissance' => [],
            'environmentalRestoration' => [],
        ];
    }

    public function apply(array $state, string $type, array $payload = []): array
    {
        $state = $this->normalizeState($state);

        return match ($type) {
            'start_mission' => $this->startMission($payload),
            'restart_mission' => $this->restartMission($state),
            'return_to_mission_select' => $this->returnToMissionSelect($state),
            'reset_game' => $this->initialState(),
            'recruit_commander' => $this->recruitCommander($state, $payload),
            'assign_commander' => $this->assignCommander($state, $payload),
            'unassign_commander' => $this->unassignCommander($state, $payload),
            'upgrade_node' => $this->upgradeNode($state, $payload),
            'attack_node' => $this->attackNode($state, $payload),
            'end_turn' => $this->endTurn($state),
            'start_research' => $this->startResearch($state, $payload),
            'cancel_research' => $this->cancelResearch($state, $payload),
            'respond_to_event' => $this->respondToEvent($state, $payload),
            default => throw new DomainException('Unknown game action: ' . $type),
        };
    }

    private function normalizeState(array $state): array
    {
        if ($state === []) {
            return $this->initialState();
        }

        return array_replace_recursive($this->initialState(), $state);
    }

    private function startMission(array $payload): array
    {
        $missionId = $this->requiredString($payload, 'mission_id');
        $state = $this->initialState();
        $state['resources'] = $this->missionResources($missionId, $state['resources']);
        $state['currentMission'] = $missionId;
        $state['missionStarted'] = true;
        $state['battleLog'] = [[
            'timestamp' => $this->nowMs(),
            'type' => 'info',
            'message' => $this->missionMessage($missionId),
        ]];
        $this->addLog($state, 'info', 'Campaign mission initialized! Build your forces and begin your conquest!');
        return $state;
    }

    private function restartMission(array $state): array
    {
        $missionId = is_string($state['currentMission'] ?? null) ? $state['currentMission'] : null;
        if ($missionId === null) {
            return $state;
        }

        return $this->startMission(['mission_id' => $missionId]);
    }

    private function returnToMissionSelect(array $state): array
    {
        $state['currentMission'] = null;
        $state['missionStarted'] = false;
        $state['phase'] = 'player';
        return $state;
    }

    private function recruitCommander(array $state, array $payload): array
    {
        $class = $this->requiredString($payload, 'class');
        $race = $this->requiredString($payload, 'race');
        $this->assertPlayerPhase($state);
        if (!isset(self::COMMANDER_CLASSES[$class])) {
            throw new DomainException('Invalid commander class.');
        }

        $cost = self::COMMANDER_CLASSES[$class]['cost'];
        if (($state['resources']['gold'] ?? 0) < $cost) {
            throw new DomainException('Insufficient gold.');
        }

        $id = $this->nextCommanderId($state);
        $commander = $this->createCommander($id, $class, $race, 'player', null);
        $state['commanders'][] = $commander;
        $state['resources']['gold'] -= $cost;
        $this->addLog($state, 'recruitment', sprintf('Recruited %s for %d gold', $commander['name'], $cost));
        return $state;
    }

    private function assignCommander(array $state, array $payload): array
    {
        $commanderId = $this->requiredInt($payload, 'commander_id');
        $nodeId = $this->requiredInt($payload, 'node_id');
        $this->assertPlayerPhase($state);

        $commanderIndex = $this->commanderIndex($state, $commanderId);
        $node = $this->node($state, $nodeId);
        if (($state['commanders'][$commanderIndex]['owner'] ?? null) !== 'player') {
            throw new DomainException('Commander is not controlled by the player.');
        }
        if (($node['owner'] ?? null) !== 'player') {
            throw new DomainException('Commanders can only be assigned to player-controlled nodes.');
        }

        $capacity = self::NODE_TYPES[$node['type']]['capacity'] ?? 2;
        $assigned = count(array_filter($state['commanders'], static fn (array $commander): bool => ($commander['assignedNode'] ?? null) === $nodeId));
        if ($assigned >= $capacity) {
            throw new DomainException('Node is at commander capacity.');
        }

        $state['commanders'][$commanderIndex]['assignedNode'] = $nodeId;
        $this->addLog($state, 'info', sprintf('%s assigned to defend the %s', $state['commanders'][$commanderIndex]['name'], $this->nodeName($node)));
        return $state;
    }

    private function unassignCommander(array $state, array $payload): array
    {
        $commanderId = $this->requiredInt($payload, 'commander_id');
        $this->assertPlayerPhase($state);
        $commanderIndex = $this->commanderIndex($state, $commanderId);
        if (($state['commanders'][$commanderIndex]['owner'] ?? null) !== 'player') {
            throw new DomainException('Commander is not controlled by the player.');
        }

        $state['commanders'][$commanderIndex]['assignedNode'] = null;
        $this->addLog($state, 'info', sprintf('%s recalled from duty', $state['commanders'][$commanderIndex]['name']));
        return $state;
    }

    private function upgradeNode(array $state, array $payload): array
    {
        $nodeId = $this->requiredInt($payload, 'node_id');
        $this->assertPlayerPhase($state);
        $nodeIndex = $this->nodeIndex($state, $nodeId);
        $node = $state['nodes'][$nodeIndex];
        if (($node['owner'] ?? null) !== 'player') {
            throw new DomainException('Only player-controlled nodes can be upgraded.');
        }
        if (($node['starLevel'] ?? 1) >= 5) {
            throw new DomainException('Node is already at maximum level.');
        }

        $cost = $this->upgradeCost($node);
        if (($state['resources']['gold'] ?? 0) < $cost) {
            throw new DomainException('Insufficient gold.');
        }

        $state['nodes'][$nodeIndex]['starLevel']++;
        $state['nodes'][$nodeIndex]['garrison'] += 25;
        $state['resources']['gold'] -= $cost;
        $this->addLog($state, 'info', sprintf('%s upgraded to %d stars for %d gold!', $this->nodeName($node), $state['nodes'][$nodeIndex]['starLevel'], $cost));
        return $state;
    }

    private function attackNode(array $state, array $payload): array
    {
        $defenderNodeId = $this->requiredInt($payload, 'node_id');
        $attackerNodeId = isset($payload['attacker_node_id']) ? (int) $payload['attacker_node_id'] : (int) ($state['selectedNode'] ?? 0);
        $this->assertPlayerPhase($state);
        $attackerIndex = $this->nodeIndex($state, $attackerNodeId);
        $defenderIndex = $this->nodeIndex($state, $defenderNodeId);
        $attacker = $state['nodes'][$attackerIndex];
        $defender = $state['nodes'][$defenderIndex];

        if (($attacker['owner'] ?? null) !== 'player' || ($defender['owner'] ?? null) === 'player') {
            throw new DomainException('Invalid attack ownership.');
        }
        if (!in_array($defenderNodeId, $attacker['connections'] ?? [], true)) {
            throw new DomainException('Target node is not connected.');
        }

        $result = $this->resolveBattle(
            $attacker,
            $defender,
            $this->commandersAtNode($state, $attackerNodeId),
            $this->commandersAtNode($state, $defenderNodeId)
        );

        if ($result['victory']) {
            $state['nodes'][$defenderIndex]['owner'] = 'player';
            $state['nodes'][$defenderIndex]['garrison'] = max(10, (int) floor(($defender['garrison'] ?? 0) * 0.5));
            $state['nodes'][$attackerIndex]['garrison'] = max(20, (int) (($attacker['garrison'] ?? 0) - 10));
            foreach ($state['commanders'] as $index => $commander) {
                if (($commander['assignedNode'] ?? null) === $attackerNodeId && ($commander['owner'] ?? null) === 'player') {
                    $state['commanders'][$index]['experience'] = ($commander['experience'] ?? 0) + $result['experienceGained'];
                }
            }
            $this->addLog($state, 'victory', sprintf('Successfully captured %s!', $this->nodeName($defender)));
            $this->addLog($state, 'info', sprintf('Commanders gained %d experience', $result['experienceGained']));
        } else {
            $state['nodes'][$defenderIndex]['garrison'] = max(10, (int) (($defender['garrison'] ?? 0) - 5));
            $state['nodes'][$attackerIndex]['garrison'] = max(10, (int) (($attacker['garrison'] ?? 0) - 15));
            $this->addLog($state, 'defeat', sprintf('Attack on %s failed!', $this->nodeName($defender)));
        }

        return $state;
    }

    private function endTurn(array $state): array
    {
        $this->assertPlayerPhase($state);
        $state['phase'] = 'enemy';
        $state = $this->processEnemyTurn($state);
        $state = $this->collectPlayerResources($state);
        $state['turn'] = ((int) ($state['turn'] ?? 1)) + 1;
        $state['phase'] = 'player';
        $state['statistics']['turnCount'] = $state['turn'];
        return $state;
    }

    private function processEnemyTurn(array $state): array
    {
        $enemyNodes = array_values(array_filter($state['nodes'], static fn (array $node): bool => ($node['owner'] ?? null) === 'enemy'));
        $enemyIncome = $this->incomeForOwner($state['nodes'], 'enemy');
        $this->addLog($state, 'info', sprintf('Enemy collected %d gold, %d supplies, %d mana', $enemyIncome['gold'], $enemyIncome['supplies'], $enemyIncome['mana']));

        $enemyCommanders = array_values(array_filter($state['commanders'], static fn (array $commander): bool => ($commander['owner'] ?? null) === 'enemy'));
        if (count($enemyCommanders) < 3 && $enemyIncome['gold'] >= 150) {
            $classes = ['knight', 'mage', 'ranger', 'warlord'];
            $class = $classes[($state['turn'] ?? 1) % count($classes)];
            $commander = $this->createCommander($this->nextCommanderId($state), $class, 'orc', 'enemy', null);
            $state['commanders'][] = $commander;
            $this->addLog($state, 'recruitment', sprintf('Enemy recruited %s', $commander['name']));
        }

        $targets = [];
        foreach ($enemyNodes as $enemyNode) {
            foreach (($enemyNode['connections'] ?? []) as $connectionId) {
                $target = $this->findNode($state, (int) $connectionId);
                if ($target !== null && in_array($target['owner'] ?? null, ['player', 'neutral'], true)) {
                    $targets[] = ['attacker' => $enemyNode, 'target' => $target, 'priority' => ($target['owner'] ?? null) === 'player' ? 2 : 1];
                }
            }
        }
        usort($targets, static fn (array $a, array $b): int => (($b['priority'] <=> $a['priority']) ?: (($b['attacker']['garrison'] ?? 0) <=> ($a['attacker']['garrison'] ?? 0))));

        $attacks = 0;
        foreach (array_slice($targets, 0, 2) as $attack) {
            $attackerIndex = $this->nodeIndex($state, (int) $attack['attacker']['id']);
            $targetIndex = $this->nodeIndex($state, (int) $attack['target']['id']);
            $result = $this->resolveBattle(
                $attack['attacker'],
                $attack['target'],
                $this->commandersAtNode($state, (int) $attack['attacker']['id']),
                $this->commandersAtNode($state, (int) $attack['target']['id'])
            );
            if ($result['victory']) {
                $state['nodes'][$targetIndex]['owner'] = 'enemy';
                $state['nodes'][$targetIndex]['garrison'] = max(10, (int) floor(($attack['attacker']['garrison'] ?? 0) * 0.7));
                $state['nodes'][$attackerIndex]['garrison'] = max(10, (int) floor(($state['nodes'][$attackerIndex]['garrison'] ?? 0) * 0.8));
                $this->addLog($state, 'defeat', sprintf('Enemy captured %s!', $this->nodeName($attack['target'])));
            } else {
                $state['nodes'][$targetIndex]['garrison'] = max(10, (int) floor(($state['nodes'][$targetIndex]['garrison'] ?? 0) * 0.9));
                $state['nodes'][$attackerIndex]['garrison'] = max(10, (int) floor(($state['nodes'][$attackerIndex]['garrison'] ?? 0) * 0.7));
                $this->addLog($state, 'victory', sprintf('Player forces defended %s from enemy attack!', $this->nodeName($attack['target'])));
            }
            $attacks++;
        }

        if ($attacks === 0) {
            $this->addLog($state, 'info', 'Enemy consolidated their forces this turn');
        }

        foreach ($state['nodes'] as $index => $node) {
            if (($node['owner'] ?? null) === 'enemy') {
                $state['nodes'][$index]['garrison'] = min((int) (($node['garrison'] ?? 0) + (8 * ($node['starLevel'] ?? 1))), 180 + (($node['starLevel'] ?? 1) * 40));
            }
        }

        return $state;
    }

    private function collectPlayerResources(array $state): array
    {
        $income = $this->incomeForOwner($state['nodes'], 'player');
        foreach ($income as $key => $value) {
            $state['resources'][$key] = ($state['resources'][$key] ?? 0) + $value;
        }
        foreach ($state['nodes'] as $index => $node) {
            if (($node['owner'] ?? null) === 'player') {
                $state['nodes'][$index]['garrison'] = min((int) (($node['garrison'] ?? 0) + (10 * ($node['starLevel'] ?? 1))), 200 + (($node['starLevel'] ?? 1) * 50));
            }
        }
        $this->addLog($state, 'info', sprintf('Turn %d: Collected %d gold, %d supplies, %d mana. Garrisons reinforced!', ((int) ($state['turn'] ?? 1)) + 1, $income['gold'], $income['supplies'], $income['mana']));
        return $state;
    }

    private function respondToEvent(array $state, array $payload): array
    {
        $eventId = $this->requiredString($payload, 'event_id');
        $choiceId = $this->requiredString($payload, 'choice_id');
        $state['events'] = array_values(array_filter($state['events'] ?? [], static fn (array $event): bool => ($event['id'] ?? null) !== $eventId));
        $state['narrativeState']['playerChoices'][] = ['eventId' => $eventId, 'choiceId' => $choiceId, 'turn' => $state['turn'] ?? 1, 'consequences' => [], 'impact' => []];
        $this->addLog($state, 'info', 'Story choice recorded.');
        return $state;
    }

    private function startResearch(array $state, array $payload): array
    {
        $technology = $this->requiredString($payload, 'technology');
        $this->assertPlayerPhase($state);
        $completed = $state['research']['completedTechnologies'] ?? [];
        $activeProjects = $state['research']['activeProjects'] ?? [];
        if (in_array($technology, $completed, true)) {
            throw new DomainException('Research is already complete.');
        }
        foreach ($activeProjects as $project) {
            if (($project['technology'] ?? null) === $technology) {
                throw new DomainException('Research is already active.');
            }
        }

        $cost = $this->researchCost($technology);
        if (($state['resources']['knowledge'] ?? 0) < $cost) {
            throw new DomainException('Insufficient knowledge.');
        }

        $state['resources']['knowledge'] -= $cost;
        $state['research']['activeProjects'][] = [
            'id' => 'research_' . $this->nowMs(),
            'technology' => $technology,
            'progress' => 0,
            'totalRequired' => $cost,
            'researchers' => 1,
            'priority' => 1,
            'startedTurn' => $state['turn'] ?? 1,
        ];
        $this->addLog($state, 'info', 'Started research on ' . $technology);
        return $state;
    }

    private function cancelResearch(array $state, array $payload): array
    {
        $projectId = $this->requiredString($payload, 'project_id');
        $this->assertPlayerPhase($state);
        $projects = $state['research']['activeProjects'] ?? [];
        $matchedProject = null;
        $remaining = [];
        foreach ($projects as $project) {
            if (($project['id'] ?? null) === $projectId) {
                $matchedProject = $project;
                continue;
            }
            $remaining[] = $project;
        }
        if ($matchedProject === null) {
            throw new DomainException('Research project not found.');
        }

        $refund = (int) floor(((int) ($matchedProject['totalRequired'] ?? $this->researchCost((string) ($matchedProject['technology'] ?? '')))) * 0.5);
        $state['research']['activeProjects'] = $remaining;
        $state['resources']['knowledge'] = ($state['resources']['knowledge'] ?? 0) + $refund;
        $this->addLog($state, 'info', sprintf('Cancelled research on %s (%d knowledge refunded)', (string) ($matchedProject['technology'] ?? 'unknown'), $refund));
        return $state;
    }

    private function missionResources(string $missionId, array $resources): array
    {
        return match ($missionId) {
            'chapter_1_awakening' => array_replace($resources, ['gold' => 300, 'supplies' => 75, 'mana' => 25]),
            'chapter_2_reclamation' => array_replace($resources, ['gold' => 500, 'supplies' => 150, 'mana' => 75, 'knowledge' => 50]),
            'chapter_3_alliance' => array_replace($resources, ['gold' => 750, 'supplies' => 200, 'mana' => 100, 'knowledge' => 100, 'influence' => 25]),
            'chapter_4_purification' => array_replace($resources, ['gold' => 1000, 'supplies' => 250, 'mana' => 150, 'knowledge' => 150, 'culture' => 50, 'materials' => 150]),
            'chapter_5_ascension' => array_replace($resources, ['gold' => 1500, 'supplies' => 300, 'mana' => 200, 'knowledge' => 200, 'culture' => 100, 'influence' => 75, 'materials' => 200, 'artifacts' => 5]),
            default => $resources,
        };
    }

    private function missionMessage(string $missionId): string
    {
        return match ($missionId) {
            'chapter_1_awakening' => 'The Awakening begins! Rally the survivors and reclaim your homeland.',
            'chapter_2_reclamation' => 'The Reclamation starts! Use your growing knowledge to expand your territory.',
            'chapter_3_alliance' => 'Forge alliances! Diplomacy and influence will be key to success.',
            'chapter_4_purification' => 'The Purification begins! Cleanse the corruption and restore the land.',
            'chapter_5_ascension' => 'The final Ascension! Use all your power to rebuild Aeloria completely.',
            default => 'Started mission: ' . $missionId,
        };
    }

    private function initialNodes(): array
    {
        $nodes = [
            [1, 'city', 125, 275, 'player', 1, 100, [2, 3, 5]],
            [2, 'resource', 75, 175, 'neutral', 1, 50, [1, 4]],
            [3, 'resource', 175, 375, 'neutral', 1, 50, [1, 6]],
            [4, 'fortress', 375, 125, 'neutral', 2, 150, [2, 5, 7]],
            [5, 'shrine', 375, 275, 'neutral', 1, 75, [1, 4, 6, 7, 8]],
            [6, 'resource', 325, 425, 'neutral', 1, 50, [3, 5, 8]],
            [7, 'city', 625, 275, 'enemy', 2, 120, [4, 5, 9]],
            [8, 'fortress', 575, 175, 'enemy', 2, 180, [5, 6, 9]],
            [9, 'stronghold', 675, 275, 'enemy', 3, 250, [7, 8, 10]],
            [10, 'stronghold', 725, 375, 'enemy', 3, 300, [9]],
            [11, 'resource', 425, 375, 'neutral', 1, 50, [5, 6, 8]],
        ];

        return array_map(static fn (array $node): array => [
            'id' => $node[0],
            'type' => $node[1],
            'x' => $node[2],
            'y' => $node[3],
            'owner' => $node[4],
            'starLevel' => $node[5],
            'garrison' => $node[6],
            'connections' => $node[7],
        ], $nodes);
    }

    private function baseResources(): array
    {
        return ['gold' => 500, 'supplies' => 100, 'mana' => 50, 'knowledge' => 25, 'culture' => 10, 'influence' => 5, 'materials' => 75, 'food' => 200, 'energy' => 100, 'artifacts' => 0];
    }

    private function createCommander(int $id, string $class, string $race, string $owner, ?int $assignedNode): array
    {
        $stats = self::COMMANDER_CLASSES[$class] ?? self::COMMANDER_CLASSES['knight'];
        return [
            'id' => $id,
            'name' => ucfirst($race) . ' ' . ucfirst($class) . ' ' . $id,
            'class' => $class,
            'race' => $race,
            'level' => 1,
            'experience' => 0,
            'health' => $stats['health'],
            'maxHealth' => $stats['health'],
            'attack' => $stats['attack'],
            'defense' => $stats['defense'],
            'assignedNode' => $assignedNode,
            'owner' => $owner,
            'alignment' => 'neutral',
            'generation' => 1,
            'traits' => [],
            'backstory' => 'A commander forged in the ashes of Aeloria.',
            'relationships' => [],
            'skills' => [],
            'specializations' => [],
            'loyaltyToPlayer' => $owner === 'player' ? 85 : 0,
            'loyaltyToFaction' => null,
            'morale' => 80,
            'fatigue' => 0,
            'injuries' => [],
            'equipment' => ['weapon' => null, 'armor' => null, 'accessories' => [], 'artifacts' => []],
            'quests' => [],
            'achievements' => [],
            'personalityTraits' => [],
            'army' => ['soldiers' => 20, 'archers' => 10, 'cavalry' => 5, 'mages' => 2, 'engineers' => 0, 'scouts' => 5, 'healers' => 2, 'specialists' => 0],
        ];
    }

    private function resolveBattle(array $attacker, array $defender, array $attackerCommanders, array $defenderCommanders): array
    {
        $attackerStrength = ($attacker['garrison'] ?? 0) + (($attacker['starLevel'] ?? 1) * 20) + $this->commanderAttackBonus($attackerCommanders);
        $defenderStrength = (($defender['garrison'] ?? 0) + (($defender['starLevel'] ?? 1) * 15) + $this->commanderDefenseBonus($defenderCommanders)) * 1.2;
        $victory = $attackerStrength > $defenderStrength;
        $ratio = $attackerStrength / max($defenderStrength, 1);
        return ['victory' => $victory, 'experienceGained' => $victory ? (int) floor(50 * $ratio) : 25];
    }

    private function commanderAttackBonus(array $commanders): int
    {
        return (int) array_reduce($commanders, static fn (int $sum, array $commander): int => $sum + (int) (($commander['attack'] ?? 0) * 1.2 + (($commander['level'] ?? 1) * 8)), 0);
    }

    private function commanderDefenseBonus(array $commanders): int
    {
        return (int) array_reduce($commanders, static fn (int $sum, array $commander): int => $sum + (int) (($commander['defense'] ?? 0) * 1.2 + (($commander['level'] ?? 1) * 8)), 0);
    }

    private function incomeForOwner(array $nodes, string $owner): array
    {
        $income = ['gold' => 0, 'supplies' => 0, 'mana' => 0];
        foreach ($nodes as $node) {
            if (($node['owner'] ?? null) !== $owner) {
                continue;
            }
            $type = self::NODE_TYPES[$node['type']] ?? null;
            if ($type === null) {
                continue;
            }
            $income['gold'] += $type['gold'];
            $income['supplies'] += $type['supplies'];
            $income['mana'] += $type['mana'];
        }
        return $income;
    }

    private function upgradeCost(array $node): int
    {
        $multiplier = ['city' => 1.5, 'fortress' => 2.0, 'stronghold' => 2.5, 'resource' => 1.0, 'shrine' => 1.8][$node['type'] ?? 'resource'] ?? 1.0;
        return (int) floor(200 * ($node['starLevel'] ?? 1) * $multiplier);
    }

    private function researchCost(string $technology): int
    {
        return match ($technology) {
            'basic_infrastructure' => 25,
            'advanced_agriculture' => 35,
            'arcane_studies' => 50,
            'military_tactics' => 50,
            default => 50,
        };
    }

    private function nodeName(array $node): string
    {
        return self::NODE_TYPES[$node['type']]['name'] ?? 'Node';
    }

    private function addLog(array &$state, string $type, string $message): void
    {
        $state['battleLog'][] = ['timestamp' => $this->nowMs(), 'type' => $type, 'message' => $message];
        $state['battleLog'] = array_slice($state['battleLog'], -100);
    }

    private function assertPlayerPhase(array $state): void
    {
        if (($state['phase'] ?? 'player') !== 'player') {
            throw new DomainException('Action is only available during the player phase.');
        }
    }

    private function requiredString(array $payload, string $key): string
    {
        if (!isset($payload[$key]) || !is_string($payload[$key]) || trim($payload[$key]) === '') {
            throw new DomainException('Missing required field: ' . $key);
        }
        return $payload[$key];
    }

    private function requiredInt(array $payload, string $key): int
    {
        if (!isset($payload[$key]) || !is_numeric($payload[$key])) {
            throw new DomainException('Missing required field: ' . $key);
        }
        return (int) $payload[$key];
    }

    private function nodeIndex(array $state, int $nodeId): int
    {
        foreach ($state['nodes'] ?? [] as $index => $node) {
            if ((int) ($node['id'] ?? 0) === $nodeId) {
                return (int) $index;
            }
        }
        throw new DomainException('Node not found.');
    }

    private function node(array $state, int $nodeId): array
    {
        return $state['nodes'][$this->nodeIndex($state, $nodeId)];
    }

    private function findNode(array $state, int $nodeId): ?array
    {
        foreach ($state['nodes'] ?? [] as $node) {
            if ((int) ($node['id'] ?? 0) === $nodeId) {
                return $node;
            }
        }
        return null;
    }

    private function commanderIndex(array $state, int $commanderId): int
    {
        foreach ($state['commanders'] ?? [] as $index => $commander) {
            if ((int) ($commander['id'] ?? 0) === $commanderId) {
                return (int) $index;
            }
        }
        throw new DomainException('Commander not found.');
    }

    private function commandersAtNode(array $state, int $nodeId): array
    {
        return array_values(array_filter($state['commanders'] ?? [], static fn (array $commander): bool => ($commander['assignedNode'] ?? null) === $nodeId));
    }

    private function nextCommanderId(array $state): int
    {
        $ids = array_map(static fn (array $commander): int => (int) ($commander['id'] ?? 0), $state['commanders'] ?? []);
        return max($ids === [] ? [0] : $ids) + 1;
    }

    private function nowMs(): int
    {
        return (int) floor(microtime(true) * 1000);
    }
}
