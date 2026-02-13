/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Story Events Data for Ashes of Aeloria
 * Implements the narrative-driven events system as defined in the Game Design Document
 */

import type { EventTemplate, EventCondition, EventChoice, EventEffect, EventConsequence } from '../types/game.d.js';

// Validation function for event data integrity
export const validateEventTemplate = (eventId: string, template: EventTemplate): boolean => {
  try {
    if (!template.title || !template.description || !template.type) {
      console.error(`Event ${eventId}: Missing required fields`);
      return false;
    }

    if (!template.choices || template.choices.length === 0) {
      console.error(`Event ${eventId}: Must have at least one choice`);
      return false;
    }

    for (const choice of template.choices) {
      if (!choice.id || !choice.text || !choice.description) {
        console.error(`Event ${eventId}: Choice missing required fields`);
        return false;
      }

      if (!choice.consequences || choice.consequences.length === 0) {
        console.warn(`Event ${eventId}: Choice ${choice.id} has no consequences`);
      }
    }

    return true;
  } catch (error) {
    console.error(`Event ${eventId}: Validation error`, error);
    return false;
  }
};

// Early game events - establishing the world and introducing core themes
export const earlyGameEvents: Record<string, EventTemplate> = {
  'awakening_first_contact': {
    title: "First Contact with Survivors",
    description: "You emerge from the ancient stasis chamber to find a small group of survivors huddled around a dying fire. They look up at you with a mixture of fear, hope, and desperation. Their leader, a weathered woman named Keira, steps forward cautiously.",
    type: 'scripted',
    conditions: [
      { type: 'turn', operator: '<=', value: 3, description: "Early in the game" },
      { type: 'event_not_seen', operator: '==', value: 'awakening_first_contact', description: "First time event" }
    ],
    choices: [
      {
        id: 'gentle_approach',
        text: "Approach gently and offer help",
        description: "Show compassion and immediately begin helping the survivors",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'survivors', value: 20, description: "Survivors trust you", permanent: true },
          { type: 'resources', target: 'culture', value: 10, description: "Gain cultural influence", permanent: true },
          { type: 'flag', target: 'compassionate_leader', value: 1, description: "Set leadership style", permanent: true }
        ]
      },
      {
        id: 'authoritative_command',
        text: "Assert your authority as an Architect",
        description: "Immediately take charge and begin organizing the survivors",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'survivors', value: 10, description: "Survivors respect your authority", permanent: true },
          { type: 'resources', target: 'influence', value: 15, description: "Gain political influence", permanent: true },
          { type: 'flag', target: 'authoritative_leader', value: 1, description: "Set leadership style", permanent: true }
        ]
      },
      {
        id: 'cautious_observation',
        text: "Observe silently before acting",
        description: "Study the survivors and their situation before revealing yourself",
        requirements: [],
        consequences: [
          { type: 'resources', target: 'knowledge', value: 15, description: "Learn about current world state", permanent: true },
          { type: 'reputation', target: 'survivors', value: 5, description: "Neutral first impression", permanent: true },
          { type: 'flag', target: 'analytical_leader', value: 1, description: "Set leadership style", permanent: true }
        ]
      }
    ],
    effects: [
      { type: 'narrative_flag', target: 'first_contact_complete', value: 1 },
      { type: 'unlock_faction', target: 'survivors', value: 1 }
    ],
    weight: 100,
    repeatable: false
  },

  'sundering_revelation': {
    title: "The Truth of the Sundering",
    description: "While exploring ancient ruins, you discover records that reveal disturbing truths about the Sundering. The catastrophe wasn't an accident or external attack - it was caused by the Architects themselves in their pursuit of transcendence. How do you handle this revelation?",
    type: 'scripted',
    conditions: [
      { type: 'turn', operator: '>=', value: 8, description: "After initial exploration" },
      { type: 'turn', operator: '<=', value: 20, description: "Before mid-game" },
      { type: 'nodes_controlled', operator: '>=', value: 3, description: "Have explored enough" }
    ],
    choices: [
      {
        id: 'accept_responsibility',
        text: "Accept the Architects' responsibility",
        description: "Acknowledge the past mistakes and vow to do better",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'all_factions', value: -5, description: "Initial distrust", permanent: false },
          { type: 'resources', target: 'culture', value: 25, description: "Gain moral authority", permanent: true },
          { type: 'flag', target: 'honest_about_past', value: 1, description: "Set redemption path", permanent: true }
        ]
      },
      {
        id: 'defend_architects',
        text: "Defend the Architects' legacy",
        description: "Argue that the Architects' intentions were noble, despite the consequences",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'scholars', value: 15, description: "Scholars appreciate historical perspective", permanent: true },
          { type: 'reputation', target: 'survivors', value: -10, description: "Survivors question your judgment", permanent: true },
          { type: 'flag', target: 'defends_architects', value: 1, description: "Set pride path", permanent: true }
        ]
      },
      {
        id: 'hide_truth',
        text: "Conceal this knowledge",
        description: "Keep this revelation secret to maintain stability",
        requirements: [],
        consequences: [
          { type: 'resources', target: 'influence', value: 10, description: "Maintain current power structure", permanent: true },
          { type: 'flag', target: 'hidden_knowledge', value: 1, description: "Set secrecy path", permanent: true },
          { type: 'corruption', target: 'personal', value: 5, description: "Burden of secrets", permanent: true }
        ],
        probability: 0.8
      }
    ],
    effects: [
      { type: 'narrative_flag', target: 'sundering_truth_known', value: 1 },
      { type: 'unlock_research', target: 'ancient_history', value: 1 }
    ],
    weight: 80,
    repeatable: false
  },

  'first_faction_encounter': {
    title: "The Ember Keepers' Request",
    description: "A delegation from the Ember Keepers arrives at your settlement. They carry ancient texts and offer to share their preserved knowledge in exchange for protection. Their leader, Elder Thane, explains they've guarded the old ways for centuries, but corruption is threatening their hidden sanctuary.",
    type: 'scripted',
    conditions: [
      { type: 'turn', operator: '>=', value: 12, description: "After establishing basic settlement" },
      { type: 'resources_gold', operator: '>=', value: 200, description: "Have basic resources" }
    ],
    choices: [
      {
        id: 'accept_alliance',
        text: "Form an alliance with the Ember Keepers",
        description: "Agree to protect them in exchange for their knowledge",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'ember_keepers', value: 40, description: "Strong alliance formed", permanent: true },
          { type: 'resources', target: 'knowledge', value: 50, description: "Gain preserved wisdom", permanent: true },
          { type: 'unlock_technology', target: 'ancient_preservation', value: 1, description: "Learn preservation techniques", permanent: true },
          { type: 'resources', target: 'gold', value: -100, description: "Protection costs", permanent: true }
        ]
      },
      {
        id: 'demand_tribute',
        text: "Demand they pay tribute for protection",
        description: "Leverage your power to extract more favorable terms",
        requirements: ['flag:authoritative_leader'],
        consequences: [
          { type: 'reputation', target: 'ember_keepers', value: 10, description: "Grudging respect", permanent: true },
          { type: 'resources', target: 'gold', value: 150, description: "Tribute payments", permanent: true },
          { type: 'resources', target: 'knowledge', value: 25, description: "Limited knowledge sharing", permanent: true },
          { type: 'reputation', target: 'other_factions', value: -5, description: "Word spreads of your demands", permanent: true }
        ]
      },
      {
        id: 'decline_involvement',
        text: "Politely decline their request",
        description: "Focus on your own development without outside obligations",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'ember_keepers', value: -15, description: "Disappointed but understanding", permanent: true },
          { type: 'resources', target: 'supplies', value: 50, description: "Focus on internal development", permanent: true },
          { type: 'flag', target: 'isolationist_policy', value: 1, description: "Set diplomatic approach", permanent: true }
        ]
      }
    ],
    effects: [
      { type: 'narrative_flag', target: 'first_faction_contacted', value: 1 },
      { type: 'unlock_faction', target: 'ember_keepers', value: 1 }
    ],
    weight: 75,
    repeatable: false
  }
};

// Mid-game events - factional conflicts and major decisions
export const midGameEvents: Record<string, EventTemplate> = {
  'corruption_crisis': {
    title: "The Spreading Corruption",
    description: "A wave of magical corruption sweeps across the land, twisting plants and animals into horrific forms. Several factions blame each other for the outbreak. The Verdant Circle claims it's caused by industrial expansion, while the Iron Covenant points to uncontrolled magical experimentation.",
    type: 'scripted',
    conditions: [
      { type: 'turn', operator: '>=', value: 25, description: "Mid-game timing" },
      { type: 'corruption_level', operator: '>=', value: 30, description: "Corruption has grown" }
    ],
    choices: [
      {
        id: 'environmental_solution',
        text: "Support the Verdant Circle's environmental approach",
        description: "Focus on natural purification methods and regulation of industry",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'verdant_circle', value: 30, description: "Strong environmental alliance", permanent: true },
          { type: 'reputation', target: 'iron_covenant', value: -20, description: "Industrial faction opposition", permanent: true },
          { type: 'corruption', target: 'global', value: -15, description: "Slow but steady purification", permanent: false },
          { type: 'resources', target: 'materials', value: -50, description: "Restrict industrial production", permanent: false }
        ]
      },
      {
        id: 'technological_solution',
        text: "Develop magical-technological purification",
        description: "Combine magic and technology to create active purification systems",
        requirements: ['technology:magic', 'technology:engineering'],
        consequences: [
          { type: 'reputation', target: 'scholars', value: 25, description: "Scholars support innovation", permanent: true },
          { type: 'corruption', target: 'global', value: -25, description: "Rapid purification in some areas", permanent: false },
          { type: 'resources', target: 'mana', value: -100, description: "High magical energy cost", permanent: false },
          { type: 'risk', target: 'magical_backlash', value: 30, description: "Risk of magical instability", permanent: false }
        ]
      },
      {
        id: 'military_quarantine',
        text: "Establish military quarantine zones",
        description: "Use force to contain corruption and evacuate affected areas",
        requirements: ['reputation:iron_covenant:>=:20'],
        consequences: [
          { type: 'reputation', target: 'iron_covenant', value: 20, description: "Military efficiency appreciated", permanent: true },
          { type: 'reputation', target: 'survivors', value: -15, description: "Civilians fear harsh measures", permanent: true },
          { type: 'corruption', target: 'spread_rate', value: -50, description: "Contained but not cleansed", permanent: false },
          { type: 'resources', target: 'supplies', value: -75, description: "Military operation costs", permanent: false }
        ]
      }
    ],
    effects: [
      { type: 'world_event', target: 'corruption_crisis_active', value: 10 },
      { type: 'unlock_research', target: 'corruption_studies', value: 1 }
    ],
    weight: 85,
    repeatable: false
  },

  'merchant_caravan_crisis': {
    title: "The Lost Caravan",
    description: "A crucial merchant caravan carrying rare materials and food supplies has gone missing on the trade routes. The Merchant Princes are furious and threatening to cut off trade. Scouts report the caravan was attacked, but by whom? Raiders? A rival faction? Or something worse?",
    type: 'consequence',
    conditions: [
      { type: 'turn', operator: '>=', value: 20, description: "Established trade relations" },
      { type: 'trade_routes', operator: '>=', value: 2, description: "Active trading" }
    ],
    choices: [
      {
        id: 'launch_investigation',
        text: "Send scouts to investigate the disappearance",
        description: "Commit resources to uncovering the truth",
        requirements: [],
        consequences: [
          { type: 'resources', target: 'supplies', value: -25, description: "Investigation costs", permanent: true },
          { type: 'reputation', target: 'merchant_princes', value: 10, description: "Shows good faith", permanent: true }
        ],
        probability: 0.7
      },
      {
        id: 'offer_compensation',
        text: "Compensate the merchants immediately",
        description: "Pay for the lost goods to maintain trade relations",
        requirements: ['resources:gold:>=:300'],
        consequences: [
          { type: 'resources', target: 'gold', value: -300, description: "Compensation payment", permanent: true },
          { type: 'reputation', target: 'merchant_princes', value: 25, description: "Merchants appreciate prompt payment", permanent: true },
          { type: 'trade_volume', target: 'all', value: 10, description: "Increased trade confidence", permanent: true }
        ]
      },
      {
        id: 'demand_proof',
        text: "Demand proof before taking action",
        description: "Question the merchants' claims and demand evidence",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'merchant_princes', value: -15, description: "Merchants feel insulted", permanent: true },
          { type: 'flag', target: 'suspicious_of_merchants', value: 1, description: "Set diplomatic tone", permanent: true }
        ]
      }
    ],
    effects: [
      { type: 'narrative_flag', target: 'caravan_crisis_started', value: 1 }
    ],
    weight: 60,
    repeatable: true,
    cooldown: 15
  }
};

// Late game events - victory path divergence and transcendence themes
export const lateGameEvents: Record<string, EventTemplate> = {
  'transcendence_choice': {
    title: "The Path to Transcendence",
    description: "Your research has uncovered three possible paths to transcendence - the same choice that faced the Architects before the Sundering. You stand at the threshold of power that could remake the world, but each path demands a different sacrifice and offers a different future.",
    type: 'scripted',
    conditions: [
      { type: 'turn', operator: '>=', value: 60, description: "Late game timing" },
      { type: 'technology_count', operator: '>=', value: 20, description: "Advanced technology" },
      { type: 'reputation_total', operator: '>=', value: 200, description: "Significant influence" }
    ],
    choices: [
      {
        id: 'harmony_path',
        text: "Choose the Path of Harmony",
        description: "Unite all factions and beings in peaceful coexistence",
        requirements: ['reputation:all_factions:>=:30'],
        consequences: [
          { type: 'victory_progress', target: 'harmony', value: 50, description: "Major progress toward Harmony victory", permanent: true },
          { type: 'reputation', target: 'all_factions', value: 20, description: "All factions support unity", permanent: true },
          { type: 'flag', target: 'harmony_transcendence', value: 1, description: "Set victory path", permanent: true }
        ]
      },
      {
        id: 'ascension_path',
        text: "Choose the Path of Ascension",
        description: "Elevate yourself to become a benevolent god-ruler",
        requirements: ['technology:magic:>=:5', 'artifacts:>=:3'],
        consequences: [
          { type: 'victory_progress', target: 'ascension', value: 50, description: "Major progress toward Ascension victory", permanent: true },
          { type: 'personal_power', target: 'divine', value: 100, description: "Gain divine abilities", permanent: true },
          { type: 'flag', target: 'ascension_transcendence', value: 1, description: "Set victory path", permanent: true }
        ]
      },
      {
        id: 'dominion_path',
        text: "Choose the Path of Dominion",
        description: "Impose your will through absolute control and order",
        requirements: ['military_strength:>=:500'],
        consequences: [
          { type: 'victory_progress', target: 'dominion', value: 50, description: "Major progress toward Dominion victory", permanent: true },
          { type: 'reputation', target: 'all_factions', value: -10, description: "Fear-based respect", permanent: true },
          { type: 'flag', target: 'dominion_transcendence', value: 1, description: "Set victory path", permanent: true }
        ]
      }
    ],
    effects: [
      { type: 'narrative_flag', target: 'transcendence_path_chosen', value: 1 },
      { type: 'world_event', target: 'final_age_begins', value: 1 }
    ],
    weight: 100,
    repeatable: false
  }
};

// Random events that can occur throughout the game
export const randomEvents: Record<string, EventTemplate> = {
  'ancient_artifact_discovery': {
    title: "Ancient Artifact Discovered",
    description: "Your explorers have uncovered a mysterious artifact in the ruins of an old city. It pulses with unknown energy and bears inscriptions in the old tongue. Your scholars are divided on whether it's safe to study.",
    type: 'random',
    conditions: [
      { type: 'turn', operator: '>=', value: 10, description: "After initial exploration" }
    ],
    choices: [
      {
        id: 'study_artifact',
        text: "Study the artifact carefully",
        description: "Assign scholars to research the artifact's properties",
        requirements: ['scholars:>=:2'],
        consequences: [
          { type: 'resources', target: 'knowledge', value: 30, description: "Valuable research", permanent: true },
          { type: 'artifact', target: 'random', value: 1, description: "Artifact added to collection", permanent: true }
        ],
        probability: 0.8
      },
      {
        id: 'seal_artifact',
        text: "Seal the artifact away",
        description: "Lock it away until you're better prepared to handle its power",
        requirements: [],
        consequences: [
          { type: 'resources', target: 'mana', value: 20, description: "Artifact's passive energy", permanent: true },
          { type: 'flag', target: 'sealed_artifact_count', value: 1, description: "Track sealed artifacts", permanent: true }
        ]
      },
      {
        id: 'destroy_artifact',
        text: "Destroy the artifact",
        description: "Eliminate the potential threat permanently",
        requirements: [],
        consequences: [
          { type: 'reputation', target: 'scholars', value: -10, description: "Scholars disappointed", permanent: true },
          { type: 'corruption', target: 'local', value: -5, description: "Remove corrupting influence", permanent: true }
        ]
      }
    ],
    effects: [],
    weight: 30,
    repeatable: true,
    cooldown: 20
  },

  'refugee_arrival': {
    title: "Refugees Seek Sanctuary",
    description: "A group of desperate refugees arrives at your borders, fleeing from corruption or conflict in distant lands. They offer to work and contribute to your society, but they'll also strain your resources and potentially bring problems with them.",
    type: 'random',
    conditions: [
      { type: 'turn', operator: '>=', value: 5, description: "After initial settlement" },
      { type: 'population', operator: '>=', value: 100, description: "Established settlement" }
    ],
    choices: [
      {
        id: 'welcome_refugees',
        text: "Welcome the refugees",
        description: "Accept them into your society and provide aid",
        requirements: [],
        consequences: [
          { type: 'population', target: 'workers', value: 25, description: "Gain new workers", permanent: true },
          { type: 'resources', target: 'food', value: -30, description: "Feed additional mouths", permanent: false },
          { type: 'reputation', target: 'survivors', value: 15, description: "Compassion appreciated", permanent: true }
        ]
      },
      {
        id: 'conditional_acceptance',
        text: "Accept them conditionally",
        description: "Welcome them but with strict requirements and monitoring",
        requirements: [],
        consequences: [
          { type: 'population', target: 'workers', value: 15, description: "Some accept conditions", permanent: true },
          { type: 'resources', target: 'influence', value: 10, description: "Show controlled leadership", permanent: true },
          { type: 'social_tension', target: 'integration', value: 10, description: "Create social divisions", permanent: false }
        ]
      },
      {
        id: 'turn_away_refugees',
        text: "Turn them away",
        description: "Refuse entry to protect your own people's resources",
        requirements: [],
        consequences: [
          { type: 'resources', target: 'supplies', value: 20, description: "Preserve resources", permanent: true },
          { type: 'reputation', target: 'survivors', value: -10, description: "Seen as heartless", permanent: true },
          { type: 'moral_burden', target: 'guilt', value: 5, description: "Burden of harsh choice", permanent: true }
        ]
      }
    ],
    effects: [
      { type: 'population_event', target: 'migration_wave', value: 1 }
    ],
    weight: 40,
    repeatable: true,
    cooldown: 12
  }
};

// Export all event collections
export const allStoryEvents = {
  ...earlyGameEvents,
  ...midGameEvents,
  ...lateGameEvents,
  ...randomEvents
};

// Event weights by game phase for proper pacing
export const eventPhaseWeights = {
  early: { // Turns 1-20
    'awakening_first_contact': 100,
    'sundering_revelation': 80,
    'first_faction_encounter': 75,
    'ancient_artifact_discovery': 30,
    'refugee_arrival': 40
  },
  mid: { // Turns 21-50
    'corruption_crisis': 85,
    'merchant_caravan_crisis': 60,
    'ancient_artifact_discovery': 35,
    'refugee_arrival': 45
  },
  late: { // Turns 51+
    'transcendence_choice': 100,
    'ancient_artifact_discovery': 25,
    'refugee_arrival': 30
  }
};
