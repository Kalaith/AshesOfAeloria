import type {
  Technology,
  GameEvent,
  VictoryType,
  ResearchProject
} from '../types/game';

export interface CampaignChapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  starRating: number;
  estimatedTurns: [number, number];
  theme: string;
  coreChallenge: string;
  prerequisites: string[];
  victoryConditions: ChapterVictoryCondition[];
  storyEvents: ChapterEvent[];
  unlockedTechnologies: Technology[];
  specialRules: SpecialRule[];
  rewards: ChapterReward[];
}

export interface ChapterVictoryCondition {
  id: string;
  type: 'territory' | 'population' | 'research' | 'alliances' | 'buildings' | 'resources' | 'special';
  description: string;
  target: number;
  current: number;
  completed: boolean;
  optional: boolean;
}

export interface ChapterEvent {
  id: string;
  title: string;
  description: string;
  triggerConditions: EventTrigger[];
  choices: EventChoice[];
  consequences: EventConsequence[];
  importance: 'low' | 'medium' | 'high' | 'critical';
  unique: boolean;
}

export interface EventTrigger {
  type: 'turn' | 'research' | 'population' | 'territory' | 'diplomacy' | 'random';
  condition: string;
  value?: number;
}

export interface EventChoice {
  id: string;
  text: string;
  description: string;
  requirements: string[];
  consequences: EventConsequence[];
  morality: 'good' | 'neutral' | 'evil';
  difficulty: number;
}

export interface EventConsequence {
  type: 'resources' | 'population' | 'research' | 'diplomacy' | 'story' | 'unlock';
  target: string;
  value: number;
  description: string;
  permanent: boolean;
}

export interface SpecialRule {
  id: string;
  name: string;
  description: string;
  effects: RuleEffect[];
  duration: 'chapter' | 'permanent' | 'conditional';
}

export interface RuleEffect {
  type: string;
  modifier: number;
  target: string;
}

export interface ChapterReward {
  type: 'research' | 'resources' | 'commanders' | 'buildings' | 'legacy';
  description: string;
  value: number | string;
}

export interface ResearchNode {
  id: string;
  name: string;
  description: string;
  storyText: string;
  tier: number;
  branch: string;
  cost: ResearchCost;
  prerequisites: string[];
  unlocks: string[];
  effects: ResearchEffect[];
  chapterUnlock?: string;
  special: boolean;
}

export interface ResearchCost {
  knowledge: number;
  mana?: number;
  materials?: number;
  culture?: number;
  energy?: number;
  artifacts?: number;
}

export interface ResearchEffect {
  type: 'production' | 'military' | 'population' | 'culture' | 'unlock' | 'special';
  target: string;
  value: number;
  description: string;
}

// Campaign Chapter Definitions
export const CAMPAIGN_CHAPTERS: CampaignChapter[] = [
  {
    id: 'chapter_1_awakening',
    title: 'The Awakening',
    subtitle: 'Discovery and Basic Survival',
    description: 'You emerge from the Eternal Sleep Chamber into a world transformed by catastrophe. The great empire has fallen, but hope remains in the scattered survivors who look to you for guidance.',
    starRating: 1,
    estimatedTurns: [15, 25],
    theme: 'Discovery and Basic Survival',
    coreChallenge: 'Establish your first settlement and discover the nature of the catastrophe',
    prerequisites: [],
    victoryConditions: [
      {
        id: 'control_territories',
        type: 'territory',
        description: 'Control 5 territories',
        target: 5,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'population_goal',
        type: 'population',
        description: 'Reach population of 10,000',
        target: 10000,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'basic_infrastructure',
        type: 'research',
        description: 'Complete Basic Infrastructure research branch',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'great_awakening',
        title: 'The Great Awakening',
        description: 'You awaken in the Eternal Sleep Chamber, the last of the Architects to emerge from stasis. The world outside is changed beyond recognition.',
        triggerConditions: [{ type: 'turn', condition: 'equals', value: 1 }],
        choices: [
          {
            id: 'seek_survivors',
            text: 'Seek out other survivors',
            description: 'Search for other survivors and establish contact',
            requirements: [],
            consequences: [
              { type: 'diplomacy', target: 'all_factions', value: 10, description: 'Improved relations with survivor factions', permanent: false },
              { type: 'resources', target: 'influence', value: 25, description: 'Gained influence through leadership', permanent: false }
            ],
            morality: 'good',
            difficulty: 1
          },
          {
            id: 'secure_chamber',
            text: 'Secure the chamber first',
            description: 'Ensure the safety of the chamber and its remaining technology',
            requirements: [],
            consequences: [
              { type: 'resources', target: 'knowledge', value: 50, description: 'Preserved ancient knowledge', permanent: false },
              { type: 'unlock', target: 'chamber_technologies', value: 1, description: 'Unlocked chamber technologies', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 2
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      },
      {
        id: 'first_contact',
        title: 'First Contact',
        description: 'You encounter the Ember Keepers, a faction dedicated to preserving the last flames of civilization.',
        triggerConditions: [{ type: 'turn', condition: 'between', value: 3 }],
        choices: [
          {
            id: 'alliance_ember_keepers',
            text: 'Form an alliance',
            description: 'Ally with the Ember Keepers for mutual support',
            requirements: [],
            consequences: [
              { type: 'diplomacy', target: 'ember_keepers', value: 50, description: 'Strong alliance formed', permanent: true },
              { type: 'resources', target: 'knowledge', value: 25, description: 'Shared knowledge', permanent: false }
            ],
            morality: 'good',
            difficulty: 1
          },
          {
            id: 'trade_agreement',
            text: 'Negotiate trade',
            description: 'Establish trade relations without formal alliance',
            requirements: [],
            consequences: [
              { type: 'diplomacy', target: 'ember_keepers', value: 25, description: 'Trade partnership', permanent: true },
              { type: 'resources', target: 'materials', value: 100, description: 'Trade benefits', permanent: false }
            ],
            morality: 'neutral',
            difficulty: 2
          }
        ],
        consequences: [],
        importance: 'high',
        unique: true
      }
    ],
    unlockedTechnologies: ['basic_shelter', 'tool_making', 'sanitation', 'organized_communities'],
    specialRules: [
      {
        id: 'tutorial_bonus',
        name: 'Architect\'s Guidance',
        description: 'Research speed increased by 50% as you recall ancient knowledge',
        effects: [{ type: 'research_speed', modifier: 1.5, target: 'all' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Tier 2 Infrastructure Research', value: 'infrastructure_tier_2' },
      { type: 'commanders', description: 'Recruit Elite Architect unit', value: 1 },
      { type: 'legacy', description: 'The Awakening legacy bonus for future campaigns', value: 'awakening_legacy' }
    ]
  },
  {
    id: 'chapter_2_gathering_storms',
    title: 'Gathering Storms',
    subtitle: 'Faction Diplomacy and Early Conflicts',
    description: 'The survivor factions have taken notice of your growing power. Navigate treacherous politics while building the strength needed to weather the coming storms.',
    starRating: 2,
    estimatedTurns: [25, 40],
    theme: 'Faction Diplomacy and Early Conflicts',
    coreChallenge: 'Navigate the complex web of survivor factions while building strength',
    prerequisites: ['chapter_1_awakening'],
    victoryConditions: [
      {
        id: 'major_alliances',
        type: 'alliances',
        description: 'Form 2 major alliances OR defeat 2 hostile factions',
        target: 2,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'advanced_tech',
        type: 'research',
        description: 'Research 3 Advanced Technologies',
        target: 3,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'specialized_structures',
        type: 'buildings',
        description: 'Build 5 specialized structures',
        target: 5,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'council_of_ashes',
        title: 'The Council of Ashes',
        description: 'Representatives from all major factions gather for the first inter-faction meeting since the Sundering.',
        triggerConditions: [{ type: 'turn', condition: 'between', value: 8 }],
        choices: [
          {
            id: 'propose_unity',
            text: 'Propose a grand alliance',
            description: 'Advocate for unity among all factions',
            requirements: ['diplomacy_skill_high'],
            consequences: [
              { type: 'diplomacy', target: 'all_factions', value: 20, description: 'Improved relations with all factions', permanent: false },
              { type: 'story', target: 'unity_path', value: 1, description: 'Set on path of unity', permanent: true }
            ],
            morality: 'good',
            difficulty: 3
          },
          {
            id: 'assert_dominance',
            text: 'Assert your superiority',
            description: 'Make it clear that you are the rightful leader',
            requirements: ['military_strength_high'],
            consequences: [
              { type: 'diplomacy', target: 'weak_factions', value: 30, description: 'Intimidated weaker factions', permanent: false },
              { type: 'diplomacy', target: 'strong_factions', value: -20, description: 'Angered stronger factions', permanent: false },
              { type: 'story', target: 'dominance_path', value: 1, description: 'Set on path of dominance', permanent: true }
            ],
            morality: 'evil',
            difficulty: 2
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      }
    ],
    unlockedTechnologies: ['professional_armies', 'mechanical_engineering', 'spell_structures', 'agricultural_revival'],
    specialRules: [
      {
        id: 'faction_tensions',
        name: 'Rising Tensions',
        description: 'Diplomatic actions have increased impact due to growing faction rivalries',
        effects: [{ type: 'diplomacy_impact', modifier: 1.5, target: 'all' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Advanced Military Technologies', value: 'military_tier_2' },
      { type: 'resources', description: 'Diplomatic Treasury (+1000 Gold)', value: 1000 },
      { type: 'legacy', description: 'Diplomatic Mastery legacy bonus', value: 'diplomacy_legacy' }
    ]
  },
  {
    id: 'chapter_3_echoes_knowledge',
    title: 'Echoes of Knowledge',
    subtitle: 'Technology Recovery and Ancient Mysteries',
    description: 'Ancient vaults reveal their secrets, but with them come dangers the old world couldn\'t control. Balance progress with prudence as you unlock the power of the past.',
    starRating: 3,
    estimatedTurns: [30, 50],
    theme: 'Technology Recovery and Ancient Mysteries',
    coreChallenge: 'Recover pre-Sundering technologies while dealing with their dangers',
    prerequisites: ['chapter_2_gathering_storms'],
    victoryConditions: [
      {
        id: 'lost_knowledge_trees',
        type: 'research',
        description: 'Complete any 2 "Lost Knowledge" research trees',
        target: 2,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'ancient_sites',
        type: 'special',
        description: 'Successfully activate 3 Ancient Sites',
        target: 3,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'research_network',
        type: 'special',
        description: 'Establish a Research Network with 50+ scholars',
        target: 50,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'sealed_archive',
        title: 'The Sealed Archive',
        description: 'You discover the Technomancer\'s Vault, sealed since the Sundering and containing dangerous but powerful knowledge.',
        triggerConditions: [{ type: 'research', condition: 'completed', value: 'ancient_ruins_exploration' }],
        choices: [
          {
            id: 'cautious_study',
            text: 'Study carefully and safely',
            description: 'Take time to understand the safeguards before proceeding',
            requirements: ['scholar_commander'],
            consequences: [
              { type: 'resources', target: 'knowledge', value: 200, description: 'Safely extracted knowledge', permanent: false },
              { type: 'unlock', target: 'safe_technology_path', value: 1, description: 'Unlocked safe research methods', permanent: true }
            ],
            morality: 'good',
            difficulty: 3
          },
          {
            id: 'rush_extraction',
            text: 'Extract knowledge quickly',
            description: 'Time is precious - take the knowledge now and deal with consequences later',
            requirements: [],
            consequences: [
              { type: 'resources', target: 'knowledge', value: 500, description: 'Massive knowledge gain', permanent: false },
              { type: 'story', target: 'corruption_risk', value: 1, description: 'Increased corruption risk', permanent: true },
              { type: 'unlock', target: 'dangerous_technology_path', value: 1, description: 'Unlocked dangerous research', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 2
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      }
    ],
    unlockedTechnologies: ['memory_crystals', 'architect_blueprints', 'arcane_mastery', 'genetic_revival', 'titan_constructs'],
    specialRules: [
      {
        id: 'ancient_knowledge',
        name: 'Echoes of the Past',
        description: 'Artifacts provide bonus research points when studying related technologies',
        effects: [{ type: 'artifact_research_bonus', modifier: 2.0, target: 'related_tech' }],
        duration: 'permanent'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Lost Knowledge specialization', value: 'lost_knowledge_mastery' },
      { type: 'resources', description: 'Ancient Artifact Collection (+5 Artifacts)', value: 5 },
      { type: 'legacy', description: 'Knowledge Seeker legacy bonus', value: 'knowledge_legacy' }
    ]
  },
  {
    id: 'chapter_4_shadows_corruption',
    title: 'Shadows of Corruption',
    subtitle: 'Dealing with the Dark Legacy',
    description: 'The corruption left by the Sundering spreads like a plague across the land. Face the dark choices of how to deal with this taint while maintaining your moral compass.',
    starRating: 3,
    estimatedTurns: [35, 55],
    theme: 'Corruption and Moral Choices',
    coreChallenge: 'Purify corruption while maintaining your values and strength',
    prerequisites: ['chapter_3_echoes_knowledge'],
    victoryConditions: [
      {
        id: 'purification_sites',
        type: 'special',
        description: 'Purify or harness 10 corruption sites',
        target: 10,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'corruption_research',
        type: 'research',
        description: 'Complete either Purification OR Corruption mastery tree',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'moral_alignment',
        type: 'special',
        description: 'Maintain consistent moral alignment across major decisions',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'corrupted_sanctuary',
        title: 'The Corrupted Sanctuary',
        description: 'You discover a sacred grove twisted by corruption. The choice of how to handle it will define your approach to the taint.',
        triggerConditions: [{ type: 'turn', condition: 'between', value: 12 }],
        choices: [
          {
            id: 'purify_grove',
            text: 'Purify the grove',
            description: 'Use your power to cleanse the corruption completely',
            requirements: ['purification_magic'],
            consequences: [
              { type: 'resources', target: 'mana', value: -200, description: 'Massive mana expenditure', permanent: false },
              { type: 'unlock', target: 'purification_mastery', value: 1, description: 'Unlocked purification research', permanent: true },
              { type: 'story', target: 'purifier_path', value: 1, description: 'Set on purifier path', permanent: true }
            ],
            morality: 'good',
            difficulty: 3
          },
          {
            id: 'harness_corruption',
            text: 'Harness the corruption',
            description: 'Convert the corruption into a source of power',
            requirements: ['corruption_resistance'],
            consequences: [
              { type: 'resources', target: 'energy', value: 500, description: 'Gained dark energy', permanent: false },
              { type: 'unlock', target: 'corruption_mastery', value: 1, description: 'Unlocked corruption research', permanent: true },
              { type: 'story', target: 'corruptor_path', value: 1, description: 'Set on corruptor path', permanent: true }
            ],
            morality: 'evil',
            difficulty: 2
          },
          {
            id: 'contain_corruption',
            text: 'Contain and study it',
            description: 'Isolate the corruption for careful study',
            requirements: ['scholar_units'],
            consequences: [
              { type: 'resources', target: 'knowledge', value: 300, description: 'Gained corruption knowledge', permanent: false },
              { type: 'unlock', target: 'balanced_approach', value: 1, description: 'Unlocked balanced research', permanent: true },
              { type: 'story', target: 'scholar_path', value: 1, description: 'Set on scholar path', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 4
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      },
      {
        id: 'shadow_cultists',
        title: 'The Shadow Cultists',
        description: 'A group of survivors has begun worshipping the corruption, claiming it grants them power and purpose.',
        triggerConditions: [{ type: 'random', condition: 'chance', value: 30 }],
        choices: [
          {
            id: 'convert_cultists',
            text: 'Convert them back',
            description: 'Use diplomacy and healing to bring them back to the light',
            requirements: ['high_diplomacy', 'purification_magic'],
            consequences: [
              { type: 'population', target: 'loyalty', value: 20, description: 'Population loyalty increased', permanent: false },
              { type: 'resources', target: 'culture', value: 100, description: 'Cultural influence gained', permanent: false }
            ],
            morality: 'good',
            difficulty: 4
          },
          {
            id: 'eliminate_cultists',
            text: 'Eliminate the threat',
            description: 'Use force to end the cult before it spreads',
            requirements: ['military_units'],
            consequences: [
              { type: 'population', target: 'fear', value: 15, description: 'Population fear increased', permanent: false },
              { type: 'resources', target: 'materials', value: 150, description: 'Recovered cult resources', permanent: false }
            ],
            morality: 'evil',
            difficulty: 2
          },
          {
            id: 'infiltrate_cult',
            text: 'Infiltrate and study',
            description: 'Send agents to learn their secrets from within',
            requirements: ['spy_network'],
            consequences: [
              { type: 'resources', target: 'knowledge', value: 200, description: 'Gained secret knowledge', permanent: false },
              { type: 'story', target: 'cult_infiltration', value: 1, description: 'Ongoing cult infiltration', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 3
          }
        ],
        consequences: [],
        importance: 'high',
        unique: false
      }
    ],
    unlockedTechnologies: ['corruption_resistance', 'purification_magic', 'dark_energy_mastery', 'moral_flexibility'],
    specialRules: [
      {
        id: 'corruption_spread',
        name: 'Spreading Taint',
        description: 'Corruption sites slowly spread unless actively contained',
        effects: [{ type: 'corruption_growth', modifier: 0.05, target: 'all_territories' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Transcendence research paths', value: 'transcendence_tier_1' },
      { type: 'resources', description: 'Moral Clarity bonus (+500 Culture)', value: 500 },
      { type: 'legacy', description: 'Corruption Handler legacy bonus', value: 'corruption_legacy' }
    ]
  },
  {
    id: 'chapter_5_environmental_restoration',
    title: 'Environmental Restoration',
    subtitle: 'Healing the Wounded World',
    description: 'The land itself bears scars from the Sundering. Lead the greatest ecological restoration project in history while balancing the needs of nature and civilization.',
    starRating: 4,
    estimatedTurns: [40, 65],
    theme: 'Environmental Restoration and Balance',
    coreChallenge: 'Restore the natural world while maintaining technological progress',
    prerequisites: ['chapter_4_shadows_corruption'],
    victoryConditions: [
      {
        id: 'biome_restoration',
        type: 'special',
        description: 'Restore 3 different biome types to full health',
        target: 3,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'climate_stabilization',
        type: 'special',
        description: 'Achieve climate stability across your entire territory',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'eden_protocols',
        type: 'research',
        description: 'Develop Eden Protocols for sustainable civilization',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'last_world_tree',
        title: 'The Last World Tree',
        description: 'You discover the final surviving World Tree, ancient beyond measure but dying from the Sundering\'s poison.',
        triggerConditions: [{ type: 'research', condition: 'completed', value: 'deep_earth_communion' }],
        choices: [
          {
            id: 'heal_world_tree',
            text: 'Heal the World Tree',
            description: 'Use all your resources to save this irreplaceable ancient',
            requirements: ['nature_magic_mastery', 'purification_complete'],
            consequences: [
              { type: 'unlock', target: 'world_tree_network', value: 1, description: 'Unlocked world tree restoration', permanent: true },
              { type: 'resources', target: 'all', value: -50, description: 'Massive resource sacrifice', permanent: false },
              { type: 'special', target: 'nature_blessing', value: 1, description: 'Permanent nature blessing', permanent: true }
            ],
            morality: 'good',
            difficulty: 5
          },
          {
            id: 'extract_essence',
            text: 'Extract its essence',
            description: 'Take the tree\'s power to fuel your own projects',
            requirements: ['extraction_technology'],
            consequences: [
              { type: 'resources', target: 'energy', value: 2000, description: 'Immense energy gain', permanent: false },
              { type: 'unlock', target: 'exploitation_tech', value: 1, description: 'Unlocked exploitation technologies', permanent: true },
              { type: 'special', target: 'nature_curse', value: 1, description: 'Nature turns against you', permanent: true }
            ],
            morality: 'evil',
            difficulty: 2
          },
          {
            id: 'symbiotic_integration',
            text: 'Create symbiotic bond',
            description: 'Merge your civilization with the tree in perfect harmony',
            requirements: ['biotechnology_mastery', 'philosophical_evolution'],
            consequences: [
              { type: 'unlock', target: 'bio_civilization', value: 1, description: 'Unlocked biological civilization', permanent: true },
              { type: 'special', target: 'nature_symbiosis', value: 1, description: 'Perfect nature integration', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 4
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      }
    ],
    unlockedTechnologies: ['deep_earth_communion', 'weather_control', 'biome_engineering', 'eden_protocols'],
    specialRules: [
      {
        id: 'environmental_awakening',
        name: 'Nature\'s Response',
        description: 'Natural systems respond dynamically to your restoration efforts',
        effects: [{ type: 'environmental_feedback', modifier: 1.5, target: 'restoration_projects' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Transcendent Harmony technologies', value: 'harmony_transcendence' },
      { type: 'resources', description: 'Living World bonus (renewable resources)', value: 'renewable_abundance' },
      { type: 'legacy', description: 'World Healer legacy bonus', value: 'restoration_legacy' }
    ]
  },
  {
    id: 'chapter_6_cultural_renaissance',
    title: 'Cultural Renaissance',
    subtitle: 'The Golden Age Reborn',
    description: 'With the world healing and knowledge restored, it\'s time to create a culture that surpasses even the ancient empire. Guide the greatest artistic and intellectual flowering in history.',
    starRating: 4,
    estimatedTurns: [45, 70],
    theme: 'Cultural Development and Human Achievement',
    coreChallenge: 'Create a cultural golden age that inspires and unifies all peoples',
    prerequisites: ['chapter_5_environmental_restoration'],
    victoryConditions: [
      {
        id: 'cultural_wonders',
        type: 'buildings',
        description: 'Build 5 Great Cultural Wonders',
        target: 5,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'artistic_movements',
        type: 'special',
        description: 'Launch 3 major artistic movements across different domains',
        target: 3,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'universal_education',
        type: 'special',
        description: 'Achieve 100% literacy and cultural participation',
        target: 100,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'grand_symposium',
        title: 'The Grand Symposium',
        description: 'Scholars, artists, and philosophers from across the land gather for the greatest intellectual gathering since the ancient academies.',
        triggerConditions: [{ type: 'turn', condition: 'between', value: 20 }],
        choices: [
          {
            id: 'open_symposium',
            text: 'Open symposium to all',
            description: 'Make it a celebration of all voices and perspectives',
            requirements: ['cultural_institutions'],
            consequences: [
              { type: 'culture', target: 'diversity_bonus', value: 50, description: 'Cultural diversity flourishes', permanent: false },
              { type: 'unlock', target: 'democratic_culture', value: 1, description: 'Unlocked democratic cultural systems', permanent: true }
            ],
            morality: 'good',
            difficulty: 2
          },
          {
            id: 'elite_symposium',
            text: 'Elite-only symposium',
            description: 'Restrict access to ensure highest quality discourse',
            requirements: ['academic_hierarchy'],
            consequences: [
              { type: 'culture', target: 'excellence_bonus', value: 75, description: 'Cultural excellence achieved', permanent: false },
              { type: 'unlock', target: 'aristocratic_culture', value: 1, description: 'Unlocked aristocratic cultural systems', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 3
          }
        ],
        consequences: [],
        importance: 'high',
        unique: true
      }
    ],
    unlockedTechnologies: ['transcendent_arts', 'philosophical_evolution', 'universal_ethics', 'cultural_synthesis'],
    specialRules: [
      {
        id: 'renaissance_spirit',
        name: 'Golden Age Inspiration',
        description: 'All cultural and research projects benefit from renaissance spirit',
        effects: [{ type: 'cultural_research_bonus', modifier: 2.0, target: 'all' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'research', description: 'Unlock Final Transcendence paths', value: 'final_transcendence' },
      { type: 'resources', description: 'Cultural Legacy (+2000 Culture)', value: 2000 },
      { type: 'legacy', description: 'Renaissance Master legacy bonus', value: 'renaissance_legacy' }
    ]
  },
  {
    id: 'chapter_7_dawn_new_age',
    title: 'Dawn of a New Age',
    subtitle: 'The Final Choice',
    description: 'The world is healed, knowledge is restored, and culture flourishes. Now you must choose the ultimate destiny for your civilization and all who will come after.',
    starRating: 5,
    estimatedTurns: [50, 100],
    theme: 'Transcendence and Ultimate Destiny',
    coreChallenge: 'Choose and achieve the ultimate destiny for your civilization',
    prerequisites: ['chapter_6_cultural_renaissance'],
    victoryConditions: [
      {
        id: 'transcendence_path',
        type: 'special',
        description: 'Complete one of the three Transcendence paths',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'legacy_preparation',
        type: 'special',
        description: 'Prepare your legacy for future ages',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      },
      {
        id: 'final_unity',
        type: 'special',
        description: 'Achieve unity among all surviving peoples',
        target: 1,
        current: 0,
        completed: false,
        optional: false
      }
    ],
    storyEvents: [
      {
        id: 'transcendence_choice',
        title: 'The Transcendence Choice',
        description: 'The moment of ultimate decision arrives. What legacy will you leave for the ages?',
        triggerConditions: [{ type: 'research', condition: 'completed_any', value: 'transcendence_research' }],
        choices: [
          {
            id: 'path_harmony',
            text: 'Choose the Path of Harmony',
            description: 'Perfect balance between all aspects of existence',
            requirements: ['harmony_research_complete'],
            consequences: [
              { type: 'special', target: 'harmony_victory', value: 1, description: 'Harmony Victory achieved', permanent: true }
            ],
            morality: 'good',
            difficulty: 5
          },
          {
            id: 'path_ascension',
            text: 'Choose the Path of Ascension',
            description: 'Transcend physical limitations entirely',
            requirements: ['ascension_research_complete'],
            consequences: [
              { type: 'special', target: 'ascension_victory', value: 1, description: 'Ascension Victory achieved', permanent: true }
            ],
            morality: 'neutral',
            difficulty: 5
          },
          {
            id: 'path_dominion',
            text: 'Choose the Path of Dominion',
            description: 'Achieve ultimate control over reality itself',
            requirements: ['dominion_research_complete'],
            consequences: [
              { type: 'special', target: 'dominion_victory', value: 1, description: 'Dominion Victory achieved', permanent: true }
            ],
            morality: 'evil',
            difficulty: 5
          }
        ],
        consequences: [],
        importance: 'critical',
        unique: true
      }
    ],
    unlockedTechnologies: ['path_of_harmony', 'path_of_ascension', 'path_of_dominion', 'eternal_preservation'],
    specialRules: [
      {
        id: 'transcendence_field',
        name: 'Transcendence Field',
        description: 'Reality itself bends to accommodate your approaching transcendence',
        effects: [{ type: 'reality_manipulation', modifier: 10.0, target: 'all' }],
        duration: 'chapter'
      }
    ],
    rewards: [
      { type: 'legacy', description: 'Master of Aeloria - Ultimate achievement', value: 'master_of_aeloria' },
      { type: 'legacy', description: 'Your chosen transcendence path legacy', value: 'transcendence_chosen' },
      { type: 'legacy', description: 'Eternal remembrance across all future games', value: 'eternal_legacy' }
    ]
  }
];

// The Great Restoration Research Tree
export const RESEARCH_TREE: ResearchNode[] = [
  // TIER 1: SURVIVAL FOUNDATIONS
  {
    id: 'basic_shelter',
    name: 'Basic Shelter',
    description: 'Simple but effective housing for survivors',
    storyText: 'After the Sundering, even simple shelter became precious.',
    tier: 1,
    branch: 'infrastructure',
    cost: { knowledge: 50 },
    prerequisites: [],
    unlocks: ['organized_communities', 'sanitation'],
    effects: [
      { type: 'population', target: 'growth_rate', value: 0.1, description: 'Population growth +10%' },
      { type: 'unlock', target: 'basic_housing', value: 1, description: 'Unlocks basic housing construction' }
    ],
    special: false
  },
  {
    id: 'organized_communities',
    name: 'Organized Communities',
    description: 'Structured governance for growing settlements',
    storyText: 'Structure brings hope to the scattered survivors.',
    tier: 1,
    branch: 'infrastructure',
    cost: { knowledge: 100 },
    prerequisites: ['basic_shelter'],
    unlocks: ['settlement_planning', 'social_institutions'],
    effects: [
      { type: 'production', target: 'efficiency', value: 0.15, description: 'Production efficiency +15%' },
      { type: 'unlock', target: 'administrative_centers', value: 1, description: 'Unlocks administrative buildings' }
    ],
    special: false
  },
  {
    id: 'settlement_planning',
    name: 'Settlement Planning',
    description: 'Advanced urban design and zoning',
    storyText: 'The first architects of the new age draft blueprints for tomorrow.',
    tier: 1,
    branch: 'infrastructure',
    cost: { knowledge: 200 },
    prerequisites: ['organized_communities'],
    unlocks: ['engineering_marvels', 'transport_networks'],
    effects: [
      { type: 'unlock', target: 'urban_districts', value: 1, description: 'Unlocks specialized urban districts' },
      { type: 'population', target: 'capacity', value: 0.25, description: 'Settlement capacity +25%' }
    ],
    special: false
  },

  // TIER 2: ADVANCED INFRASTRUCTURE
  {
    id: 'engineering_marvels',
    name: 'Engineering Marvels',
    description: 'Magnificent constructions that inspire and serve',
    storyText: 'We shall build monuments that dwarf even the old empire\'s glory.',
    tier: 2,
    branch: 'infrastructure',
    cost: { knowledge: 500, materials: 200 },
    prerequisites: ['settlement_planning', 'materials_science'],
    unlocks: ['aeloran_architecture', 'power_systems'],
    effects: [
      { type: 'unlock', target: 'mega_structures', value: 1, description: 'Unlocks wonder buildings' },
      { type: 'culture', target: 'influence', value: 0.3, description: 'Cultural influence +30%' }
    ],
    special: false
  },
  {
    id: 'aeloran_architecture',
    name: 'Aeloran Architecture',
    description: 'Rediscovered building techniques of the ancient empire',
    storyText: 'The ancient styles live again, but improved by hard-won wisdom.',
    tier: 2,
    branch: 'infrastructure',
    cost: { knowledge: 800, culture: 300 },
    prerequisites: ['engineering_marvels'],
    unlocks: ['floating_settlements'],
    effects: [
      { type: 'unlock', target: 'imperial_buildings', value: 1, description: 'Unlocks imperial-style buildings' },
      { type: 'culture', target: 'bonus', value: 0.25, description: 'Cultural bonuses +25%' }
    ],
    chapterUnlock: 'chapter_3_echoes_knowledge',
    special: true
  },

  // MAGIC TREE
  {
    id: 'cantrip_mastery',
    name: 'Cantrip Mastery',
    description: 'Basic magical techniques and simple spells',
    storyText: 'Even the smallest magic lights the darkness of ignorance.',
    tier: 1,
    branch: 'magic',
    cost: { knowledge: 25, mana: 50 },
    prerequisites: [],
    unlocks: ['mana_channeling', 'spell_structures'],
    effects: [
      { type: 'unlock', target: 'basic_spells', value: 1, description: 'Unlocks basic magic' },
      { type: 'production', target: 'magical_efficiency', value: 0.15, description: 'Magical efficiency +15%' }
    ],
    special: false
  },
  {
    id: 'arcane_mastery',
    name: 'Arcane Mastery',
    description: 'High-level magical understanding and power',
    storyText: 'We approach the level of the ancient masters.',
    tier: 2,
    branch: 'magic',
    cost: { knowledge: 300, mana: 500 },
    prerequisites: ['spell_structures', 'ritual_magic', 'magical_networks'],
    unlocks: ['reality_weaving', 'planar_magic'],
    effects: [
      { type: 'unlock', target: 'high_level_spells', value: 1, description: 'Unlocks high-level spells' },
      { type: 'military', target: 'archmage_units', value: 1, description: 'Unlocks Archmage units' }
    ],
    chapterUnlock: 'chapter_3_echoes_knowledge',
    special: true
  },

  // LOST KNOWLEDGE BRANCH
  {
    id: 'memory_crystals',
    name: 'The Memory Crystals',
    description: 'Crystalized knowledge from before the Sundering',
    storyText: 'The voices of the past speak wisdom across the centuries.',
    tier: 3,
    branch: 'lost_knowledge',
    cost: { knowledge: 1000, artifacts: 3 },
    prerequisites: [],
    unlocks: ['architect_blueprints', 'sundering_records'],
    effects: [
      { type: 'special', target: 'direct_knowledge_transfer', value: 1, description: 'Direct knowledge transfer from pre-Sundering era' },
      { type: 'production', target: 'research_speed', value: 0.5, description: 'Research speed +50%' }
    ],
    chapterUnlock: 'chapter_3_echoes_knowledge',
    special: true
  },
  {
    id: 'architect_blueprints',
    name: 'Architect\'s Blueprints',
    description: 'Construction plans from the master builders of old',
    storyText: 'The original builders left us the keys to their mastery.',
    tier: 3,
    branch: 'lost_knowledge',
    cost: { knowledge: 800, artifacts: 2 },
    prerequisites: ['memory_crystals'],
    unlocks: ['instant_construction'],
    effects: [
      { type: 'special', target: 'instant_construction', value: 1, description: 'Instant construction techniques' },
      { type: 'unlock', target: 'wonder_buildings', value: 1, description: 'Unlocks wonder buildings' }
    ],
    chapterUnlock: 'chapter_3_echoes_knowledge',
    special: true
  },

  // CORRUPTION AND PURIFICATION BRANCH
  {
    id: 'corruption_resistance',
    name: 'Corruption Resistance',
    description: 'Protection against the taint left by the Sundering',
    storyText: 'Knowledge of the enemy is the first step to defeating it.',
    tier: 2,
    branch: 'corruption',
    cost: { knowledge: 400, mana: 200 },
    prerequisites: ['cantrip_mastery'],
    unlocks: ['purification_magic', 'dark_energy_mastery'],
    effects: [
      { type: 'military', target: 'corruption_defense', value: 0.5, description: 'Corruption defense +50%' },
      { type: 'unlock', target: 'corruption_research', value: 1, description: 'Unlocks corruption research options' }
    ],
    chapterUnlock: 'chapter_4_shadows_corruption',
    special: false
  },
  {
    id: 'purification_magic',
    name: 'Purification Magic',
    description: 'Magic dedicated to cleansing corruption and healing the land',
    storyText: 'Light drives back the darkness, hope conquers despair.',
    tier: 2,
    branch: 'corruption',
    cost: { knowledge: 600, mana: 400, culture: 200 },
    prerequisites: ['corruption_resistance'],
    unlocks: ['mass_purification', 'healing_sanctuaries'],
    effects: [
      { type: 'special', target: 'purification_spells', value: 1, description: 'Unlocks purification spells' },
      { type: 'production', target: 'land_healing', value: 0.3, description: 'Land healing efficiency +30%' }
    ],
    chapterUnlock: 'chapter_4_shadows_corruption',
    special: false
  },
  {
    id: 'dark_energy_mastery',
    name: 'Dark Energy Mastery',
    description: 'Harnessing the power of corruption for your own purposes',
    storyText: 'Sometimes you must become the monster to defeat the monster.',
    tier: 2,
    branch: 'corruption',
    cost: { knowledge: 600, mana: 400, energy: 300 },
    prerequisites: ['corruption_resistance'],
    unlocks: ['corruption_weaponization', 'shadow_magic'],
    effects: [
      { type: 'special', target: 'dark_magic', value: 1, description: 'Unlocks dark magic abilities' },
      { type: 'production', target: 'energy_generation', value: 0.4, description: 'Energy generation +40%' }
    ],
    chapterUnlock: 'chapter_4_shadows_corruption',
    special: false
  },

  // ENVIRONMENTAL RESTORATION BRANCH
  {
    id: 'deep_earth_communion',
    name: 'Deep Earth Communion',
    description: 'Communication with the planetary consciousness',
    storyText: 'The world itself speaks to those who know how to listen.',
    tier: 3,
    branch: 'environment',
    cost: { knowledge: 800, mana: 600, culture: 400 },
    prerequisites: ['purification_magic', 'nature_magic'],
    unlocks: ['weather_control', 'biome_engineering'],
    effects: [
      { type: 'special', target: 'planet_communication', value: 1, description: 'Direct communication with planetary systems' },
      { type: 'production', target: 'environmental_efficiency', value: 0.5, description: 'Environmental restoration +50%' }
    ],
    chapterUnlock: 'chapter_5_environmental_restoration',
    special: true
  },
  {
    id: 'weather_control',
    name: 'Weather Control',
    description: 'Direct manipulation of atmospheric and climate systems',
    storyText: 'We command the very skies to serve the restoration.',
    tier: 3,
    branch: 'environment',
    cost: { knowledge: 1000, mana: 800, energy: 500 },
    prerequisites: ['deep_earth_communion'],
    unlocks: ['climate_engineering'],
    effects: [
      { type: 'special', target: 'weather_manipulation', value: 1, description: 'Control weather patterns' },
      { type: 'production', target: 'agricultural_bonus', value: 0.6, description: 'Agricultural efficiency +60%' }
    ],
    chapterUnlock: 'chapter_5_environmental_restoration',
    special: true
  },
  {
    id: 'biome_engineering',
    name: 'Biome Engineering',
    description: 'Complete reconstruction of damaged ecosystems',
    storyText: 'We shall rebuild paradise from the ashes of the old world.',
    tier: 3,
    branch: 'environment',
    cost: { knowledge: 1200, mana: 600, materials: 800, culture: 400 },
    prerequisites: ['deep_earth_communion'],
    unlocks: ['eden_protocols'],
    effects: [
      { type: 'special', target: 'ecosystem_creation', value: 1, description: 'Create new ecosystems' },
      { type: 'production', target: 'biodiversity_bonus', value: 0.4, description: 'Biodiversity restoration +40%' }
    ],
    chapterUnlock: 'chapter_5_environmental_restoration',
    special: true
  },
  {
    id: 'eden_protocols',
    name: 'Eden Protocols',
    description: 'Perfect harmony between civilization and nature',
    storyText: 'The garden paradise, restored and perfected.',
    tier: 3,
    branch: 'environment',
    cost: { knowledge: 1500, mana: 1000, culture: 1000, energy: 600 },
    prerequisites: ['biome_engineering', 'weather_control'],
    unlocks: ['path_of_harmony'],
    effects: [
      { type: 'special', target: 'perfect_ecosystem', value: 1, description: 'Perfect ecosystem balance' },
      { type: 'production', target: 'sustainability_perfect', value: 1.0, description: 'Perfect sustainability achieved' }
    ],
    chapterUnlock: 'chapter_5_environmental_restoration',
    special: true
  },

  // CULTURAL RENAISSANCE BRANCH
  {
    id: 'transcendent_arts',
    name: 'Transcendent Arts',
    description: 'Artistic expression that touches the soul and transcends reality',
    storyText: 'Art becomes a bridge between the mortal and divine.',
    tier: 3,
    branch: 'culture',
    cost: { knowledge: 800, culture: 1000, mana: 400 },
    prerequisites: ['cultural_synthesis'],
    unlocks: ['philosophical_evolution'],
    effects: [
      { type: 'culture', target: 'inspiration_bonus', value: 0.8, description: 'Cultural inspiration +80%' },
      { type: 'unlock', target: 'masterwork_creation', value: 1, description: 'Unlocks creation of cultural masterworks' }
    ],
    chapterUnlock: 'chapter_6_cultural_renaissance',
    special: true
  },
  {
    id: 'philosophical_evolution',
    name: 'Philosophical Evolution',
    description: 'New frameworks of thought that reshape understanding',
    storyText: 'We think thoughts that no mind has thought before.',
    tier: 3,
    branch: 'culture',
    cost: { knowledge: 1000, culture: 800, energy: 400 },
    prerequisites: ['transcendent_arts'],
    unlocks: ['universal_ethics', 'transcendent_wisdom'],
    effects: [
      { type: 'special', target: 'new_philosophy', value: 1, description: 'Revolutionary philosophical frameworks' },
      { type: 'production', target: 'research_insight', value: 0.6, description: 'Research insight bonus +60%' }
    ],
    chapterUnlock: 'chapter_6_cultural_renaissance',
    special: true
  },
  {
    id: 'universal_ethics',
    name: 'Universal Ethics',
    description: 'Moral frameworks that apply across all civilizations and species',
    storyText: 'We establish the moral foundation for all future ages.',
    tier: 3,
    branch: 'culture',
    cost: { knowledge: 1200, culture: 1200, energy: 300 },
    prerequisites: ['philosophical_evolution'],
    unlocks: ['path_of_harmony'],
    effects: [
      { type: 'special', target: 'universal_morality', value: 1, description: 'Universal moral framework' },
      { type: 'diplomacy', target: 'universal_respect', value: 1.0, description: 'Universal diplomatic bonus' }
    ],
    chapterUnlock: 'chapter_6_cultural_renaissance',
    special: true
  },

  // TRANSCENDENCE PROTOCOLS
  {
    id: 'path_of_harmony',
    name: 'Path of Harmony',
    description: 'Perfect balance between all aspects of civilization',
    storyText: 'We achieve the harmony that eluded our predecessors.',
    tier: 4,
    branch: 'transcendence',
    cost: { knowledge: 2000, mana: 1000, culture: 1000, energy: 500 },
    prerequisites: ['eden_protocols', 'cultural_renaissance', 'universal_ethics'],
    unlocks: [],
    effects: [
      { type: 'special', target: 'perfect_balance', value: 1, description: 'Perfect balance between technology, magic, and nature' },
      { type: 'special', target: 'harmony_victory', value: 1, description: 'Unlocks Harmony Victory condition' }
    ],
    chapterUnlock: 'chapter_7_dawn_new_age',
    special: true
  },
  {
    id: 'path_of_ascension',
    name: 'Path of Ascension',
    description: 'Transcendence beyond physical limitations',
    storyText: 'Mortal flesh gives way to pure consciousness and will.',
    tier: 4,
    branch: 'transcendence',
    cost: { knowledge: 2500, mana: 1500, energy: 1000, artifacts: 10 },
    prerequisites: ['reality_weaving', 'transcendent_wisdom', 'eternal_preservation'],
    unlocks: [],
    effects: [
      { type: 'special', target: 'energy_beings', value: 1, description: 'Transcend physical limitations' },
      { type: 'special', target: 'ascension_victory', value: 1, description: 'Unlocks Ascension Victory condition' }
    ],
    chapterUnlock: 'chapter_7_dawn_new_age',
    special: true
  },
  {
    id: 'path_of_dominion',
    name: 'Path of Dominion',
    description: 'Ultimate control over reality through force of will',
    storyText: 'Power absolute, will unbreakable, reality malleable.',
    tier: 4,
    branch: 'transcendence',
    cost: { knowledge: 2500, mana: 2000, energy: 1500, artifacts: 10 },
    prerequisites: ['reality_weaving', 'transcendent_wisdom', 'dark_energy_mastery'],
    unlocks: [],
    effects: [
      { type: 'special', target: 'reality_control', value: 1, description: 'Complete control over reality' },
      { type: 'special', target: 'dominion_victory', value: 1, description: 'Unlocks Dominion Victory condition' }
    ],
    chapterUnlock: 'chapter_7_dawn_new_age',
    special: true
  },

  // SUPPORTING TECHNOLOGIES
  {
    id: 'nature_magic',
    name: 'Nature Magic',
    description: 'Magic that draws power from the natural world',
    storyText: 'We learn to work with nature, not against it.',
    tier: 1,
    branch: 'magic',
    cost: { knowledge: 150, mana: 100 },
    prerequisites: ['cantrip_mastery'],
    unlocks: ['deep_earth_communion'],
    effects: [
      { type: 'unlock', target: 'nature_spells', value: 1, description: 'Unlocks nature magic' },
      { type: 'production', target: 'natural_harmony', value: 0.2, description: 'Natural harmony bonus +20%' }
    ],
    special: false
  },
  {
    id: 'cultural_synthesis',
    name: 'Cultural Synthesis',
    description: 'Merging the best elements of all surviving cultures',
    storyText: 'From many traditions, one greater culture emerges.',
    tier: 2,
    branch: 'culture',
    cost: { knowledge: 400, culture: 600 },
    prerequisites: ['organized_communities'],
    unlocks: ['transcendent_arts'],
    effects: [
      { type: 'culture', target: 'synthesis_bonus', value: 0.3, description: 'Cultural synthesis bonus +30%' },
      { type: 'unlock', target: 'unified_culture', value: 1, description: 'Unlocks unified cultural systems' }
    ],
    special: false
  },
  {
    id: 'reality_weaving',
    name: 'Reality Weaving',
    description: 'Direct manipulation of the fundamental forces of reality',
    storyText: 'We become architects of existence itself.',
    tier: 3,
    branch: 'magic',
    cost: { knowledge: 1500, mana: 1200, energy: 800, artifacts: 5 },
    prerequisites: ['arcane_mastery'],
    unlocks: ['path_of_ascension', 'path_of_dominion'],
    effects: [
      { type: 'special', target: 'reality_manipulation', value: 1, description: 'Manipulate fundamental reality' },
      { type: 'unlock', target: 'transcendent_magic', value: 1, description: 'Unlocks transcendent magic' }
    ],
    chapterUnlock: 'chapter_6_cultural_renaissance',
    special: true
  },
  {
    id: 'transcendent_wisdom',
    name: 'Transcendent Wisdom',
    description: 'Understanding that transcends mortal comprehension',
    storyText: 'We see beyond the veil of ordinary perception.',
    tier: 3,
    branch: 'culture',
    cost: { knowledge: 1200, culture: 1000, mana: 600, energy: 400 },
    prerequisites: ['philosophical_evolution'],
    unlocks: ['path_of_ascension', 'path_of_dominion'],
    effects: [
      { type: 'special', target: 'transcendent_insight', value: 1, description: 'Transcendent wisdom and insight' },
      { type: 'production', target: 'all_research', value: 0.5, description: 'All research +50%' }
    ],
    chapterUnlock: 'chapter_6_cultural_renaissance',
    special: true
  },
  {
    id: 'eternal_preservation',
    name: 'Eternal Preservation',
    description: 'Methods to preserve knowledge and culture across eternity',
    storyText: 'Our legacy shall endure beyond the stars themselves.',
    tier: 4,
    branch: 'infrastructure',
    cost: { knowledge: 2000, culture: 1500, energy: 1000, artifacts: 8 },
    prerequisites: ['architect_blueprints', 'transcendent_wisdom'],
    unlocks: [],
    effects: [
      { type: 'special', target: 'eternal_legacy', value: 1, description: 'Eternal preservation of civilization' },
      { type: 'special', target: 'knowledge_eternity', value: 1, description: 'Knowledge preserved for all time' }
    ],
    chapterUnlock: 'chapter_7_dawn_new_age',
    special: true
  }
];

export const getResearchNodeById = (id: string): ResearchNode | undefined => {
  return RESEARCH_TREE.find(node => node.id === id);
};

export const getResearchNodesByBranch = (branch: string): ResearchNode[] => {
  return RESEARCH_TREE.filter(node => node.branch === branch);
};

export const getResearchNodesByTier = (tier: number): ResearchNode[] => {
  return RESEARCH_TREE.filter(node => node.tier === tier);
};

export const getAvailableResearchNodes = (completedResearch: string[], chapterProgress: string[]): ResearchNode[] => {
  return RESEARCH_TREE.filter(node => {
    // Check if prerequisites are met
    const prerequisitesMet = node.prerequisites.every(prereq => completedResearch.includes(prereq));

    // Check if chapter requirement is met (if any)
    const chapterUnlocked = !node.chapterUnlock || chapterProgress.includes(node.chapterUnlock);

    // Check if not already completed
    const notCompleted = !completedResearch.includes(node.id);

    return prerequisitesMet && chapterUnlocked && notCompleted;
  });
};

export const calculateResearchCost = (node: ResearchNode, modifiers: Record<string, number> = {}): ResearchCost => {
  const baseCost = { ...node.cost };

  Object.keys(baseCost).forEach(resource => {
    const modifier = modifiers[resource] || 1;
    baseCost[resource as keyof ResearchCost] = Math.floor((baseCost[resource as keyof ResearchCost] || 0) * modifier);
  });

  return baseCost;
};

export const getChapterById = (id: string): CampaignChapter | undefined => {
  return CAMPAIGN_CHAPTERS.find(chapter => chapter.id === id);
};

export const getNextChapter = (currentChapterId: string): CampaignChapter | undefined => {
  const currentIndex = CAMPAIGN_CHAPTERS.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex !== -1 && currentIndex < CAMPAIGN_CHAPTERS.length - 1
    ? CAMPAIGN_CHAPTERS[currentIndex + 1]
    : undefined;
};

export const checkChapterVictoryConditions = (chapter: CampaignChapter, gameState: any): boolean => {
  return chapter.victoryConditions.every(condition => condition.completed);
};