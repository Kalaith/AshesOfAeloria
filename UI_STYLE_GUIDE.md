# Ashes of Aeloria – UI Style Guide
## Frontier War Campaign Theme

*A comprehensive design system for building the battle-hardened, frontier aesthetic of Ashes of Aeloria*

---

## 🎯 **Core Visual Identity**

### **Mood & Atmosphere**
- **Theme**: Gritty war campaign, scarred landscapes, worn relics
- **Feel**: Everything should feel functional and battle-worn, as if dragged through countless campaigns
- **Narrative**: Post-apocalyptic rebuilding with echoes of a fallen empire

### **Visual Influences**
- Conan the Barbarian (rugged barbarism)
- Skyrim (nordic war aesthetics)
- Dark Souls (weathered, dark fantasy)
- Medieval war camps (utilitarian, temporary structures)

### **Material Textures**
- Rough hewn stone
- Cracked and oxidized metal
- Burnt and scarred wood
- Tattered banners and cloth
- Charred parchment and leather
- Weathered bone and horn

---

## 🎨 **Color Palette**

### **Primary Colors**

| Element | Colors | Hex Codes | Usage |
|---------|--------|-----------|-------|
| **Primary UI** | Deep Iron Grey, Charcoal | `#2B2B2C`, `#1E1E20` | Heavy base/metal background tones |
| **Secondary** | Rusted Bronze, Aged Steel | `#7B4F2E`, `#6C6C6C` | Panel edges, button outlines, frames |
| **Highlight/Active** | Blood Red, Ember Orange | `#A93226`, `#E67E22` | Selected nodes, attack buttons, urgent alerts |
| **Neutral Text** | Parchment Beige, Bone White | `#D7C7A0`, `#EDEADE` | Readable text on dark backgrounds |
| **Magical Accents** | Mana Blue, Crystal Teal | `#3498DB`, `#1ABC9C` | Special nodes, magical abilities (sparingly) |

### **Extended Palette**

| Category | Color | Hex | Application |
|----------|-------|-----|-------------|
| **Damage/Danger** | Crimson Red | `#DC143C` | Health bars, damage indicators |
| **Success/Healing** | Forest Green | `#228B22` | Healing effects, completed objectives |
| **Warning** | Amber Gold | `#FFC107` | Caution states, important notifications |
| **Disabled** | Ash Grey | `#6C757D` | Inactive elements, locked content |
| **Corruption** | Void Purple | `#4A148C` | Corrupted areas, dark magic |

---

## 📝 **Typography System**

### **Font Hierarchy**

#### **Primary Fonts**
- **Headers/Titles**: `Cinzel Decorative` or `Uncial Antiqua`
  - Fantasy-epic style with medieval character
  - Use for game title, major section headers

- **Body/UI Text**: `Merriweather Sans` or `Roboto Slab`
  - Strong readability with slab-serif war report feel
  - Primary font for interfaces and descriptions

- **Accent Text**: `IM Fell English SC` or similar distressed typeface
  - Events, lore, abilities, flavor text
  - Adds immersion and historical feel

#### **Font Scale & Usage**

| Level | Size | Font | Weight | Case | Usage |
|-------|------|------|--------|------|-------|
| **H1** | 36-48px | Cinzel Decorative | Bold | UPPERCASE | Major titles, game logo |
| **H2** | 24-32px | Roboto Slab | Bold | Title Case | Panel titles, chapter names |
| **H3** | 20-24px | Roboto Slab | Semibold | Title Case | Sub-sections, commander names |
| **Body** | 14-18px | Merriweather Sans | Regular | Sentence case | Descriptions, stats |
| **Caption** | 12-14px | Merriweather Sans | Regular | Sentence case | Small labels, tooltips |
| **Button** | 14-16px | Roboto Slab | Bold | UPPERCASE | All interactive elements |

### **Text Effects**
- **Embossed Effect**: Subtle shadow/highlight for carved-in-stone look
- **Bronze Highlight**: Metallic glow for important headings
- **Parchment Background**: Subtle texture behind large text blocks
- **Distressed Edges**: Slightly irregular letter spacing for worn feel

---

## 🖼️ **Panels & Containers**

### **Design Principles**
- Panels resemble wooden boards with iron rivets
- Metal plates scarred from battle
- Layered construction showing wear and repair

### **Panel Styles**

#### **Primary Panels**
```css
background: linear-gradient(145deg, #2B2B2C, #1E1E20);
border: 2px solid #7B4F2E;
border-radius: 4px;
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.1),
  0 2px 4px rgba(0,0,0,0.3);
```

#### **Secondary Panels**
```css
background: rgba(43, 43, 44, 0.8);
border: 1px solid #6C6C6C;
backdrop-filter: blur(2px);
```

### **Panel States**

| State | Border | Background | Shadow | Animation |
|-------|--------|------------|--------|-----------|
| **Default** | `#7B4F2E` | `#2B2B2C` | Subtle inset | None |
| **Hover** | `#E67E22` (glow) | Slightly lighter | Increased depth | Border glow |
| **Active** | `#A93226` | Highlighted | Deep inset | Quick pulse |
| **Disabled** | `#6C757D` | Darkened | Flat | Opacity 60% |

### **Special Panel Types**

#### **Riveted Metal Frame**
- Decorative rivets at corners
- Slightly uneven edges (hand-forged look)
- Oxidation/rust patterns in corners

#### **Parchment Overlay**
- Subtle paper texture
- Burn marks or tears at edges
- Aged yellowing effect

#### **Banner Style**
- Cloth texture with visible weave
- Torn or tattered edges
- Hanging from metal rings or nails

---

## 🗺️ **Campaign Map Screen**

The active campaign screen should read as a premium fantasy war map, not a dashboard around a grid.

### **Target Composition**
```
┌──────────────────────────────────────────────────────────────┐
│ Title / chapter            Resources             Utilities   │
├──────┬──────────────────────────────────────────────┬────────┤
│ Nav  │ Full-bleed illustrated campaign map          │ Node   │
│ rail │ - region art                                 │ intel  │
│      │ - glowing routes                             │ panel  │
│      │ - framed stronghold nodes                    │        │
├──────┴──────────────────────────────────────────────┴────────┤
│ Commander/hero card      Chapter progression      Turn wheel │
└──────────────────────────────────────────────────────────────┘
```

### **Map Layering**
Use layered presentation instead of drawing abstract circles on a blank grid:
1. **Terrain layer**: illustrated or generated bitmap/vector map with reclaimed lands, wilds, mountains, rivers, and corrupted ashlands.
2. **Region layer**: ownership/corruption overlays that tint broad zones.
3. **Route layer**: SVG routes with faction-colored glow.
4. **Node layer**: HTML/SVG stronghold badges anchored to map coordinates.
5. **HUD layer**: selected-node details, chapter progress, commander status, and turn controls.

### **Stronghold Node Badges**
- Nodes are framed badges with banner tabs, not flat circles.
- The frame color communicates ownership:
  - Player/reclaimed: blue steel glow.
  - Enemy/corrupted: blood red glow.
  - Neutral/unclaimed: aged iron/bronze.
  - Arcane/faction: purple or teal accent used sparingly.
- Each badge must show:
  - Node art or icon.
  - Nameplate.
  - Star level.
  - Garrison or threat value.
  - Commander count if present.
  - Attackable state when reachable from a selected player node.

### **Routes**
- Routes should be visible strategic paths, not grid edges.
- Player-linked routes glow blue.
- Enemy-linked routes glow red.
- Arcane routes glow purple.
- Routes connected to the selected node use amber emphasis.

### **Interaction States**
- Hover: slight lift, brightness increase, route/node glow.
- Selected: amber frame and highlighted connected routes.
- Attackable: red pulse and clear action state.
- Locked: dimmed node, lock marker, no hover lift.
- Disabled actions must remain visibly disabled and should not imply interactivity.

### **Milestone Implementation Notes**
- The first production step is a `CampaignMap` component that replaces the old canvas grid with terrain, route, and node layers.
- Existing backend node data can drive the first pass: `x`, `y`, `owner`, `type`, `starLevel`, `garrison`, and `connections`.
- Longer term, backend map payloads should include presentation metadata such as display name, biome, threat level, reward preview, image key, and chapter gate.

### **HUD Components**
- **Top resource bar**: title/chapter identity, resource counters with per-turn income, account state, and only compact campaign controls.
- **Left rail**: icon-first tool access for army, commanders, inventory, relics, and journal. Rail actions open contextual panels or existing modals.
- **Node intel panel**: appears as the primary right-side context panel, showing selected stronghold art, owner, type, garrison, threat, rewards, and available orders.
- **Commander summary**: compact bottom-left hero/commander status with portrait frame, level/class, and health bar.
- **Chapter strip**: bottom campaign progression using roman chapter markers, current chapter emphasis, and locked/future state.
- **Turn control**: bottom-right turn wheel/card with turn number, reclaimed-node progress, and a single end-turn action.

---

## 🔲 **Button System**

### **Button Categories**

#### **Primary Action Buttons**
**Style**: Forged metal slab with ember glow
```css
background: linear-gradient(135deg, #6C6C6C, #2B2B2C);
border: 2px solid #7B4F2E;
color: #EDEADE;
text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
transition: all 0.2s ease;
```

**Hover State**:
```css
border-color: #E67E22;
box-shadow: 0 0 8px rgba(230, 126, 34, 0.4);
transform: translateY(-1px);
```

**Active State**:
```css
animation: metalImpact 0.1s ease;
transform: translateY(1px);
```

#### **Secondary Buttons**
**Style**: Leather strap with stitched edges
```css
background: linear-gradient(135deg, #8B4513, #654321);
border: 1px solid #5D4E37;
color: #D7C7A0;
```

#### **Danger/Attack Buttons**
**Style**: Rusted steel with glowing cracks
```css
background: linear-gradient(135deg, #A93226, #8B1A1A);
border: 2px solid #DC143C;
box-shadow:
  inset 0 0 10px rgba(220, 20, 60, 0.3),
  0 0 15px rgba(220, 20, 60, 0.2);
```

### **Button States & Animations**

| State | Visual Effect | Animation | Duration |
|-------|---------------|-----------|----------|
| **Hover** | Ember glow, slight lift | `translateY(-2px)` | 200ms |
| **Active** | Metal impact, press down | `translateY(1px)` + pulse | 100ms |
| **Loading** | Dim glow pulse | Breathing animation | 1.5s loop |
| **Disabled** | Darkened, cracked appearance | None | - |

---

## 🎯 **Icons & Symbols**

### **Design Style**
- **Engraved relief** icons (stamped into metal or carved into wood)
- **Weathered appearance** with worn edges
- **Consistent stroke weight** for family cohesion
- **High contrast** for visibility on dark backgrounds

### **Icon Categories**

#### **Node Type Icons**

| Node Type | Icon | Description |
|-----------|------|-------------|
| **Cities** | 🏰 | Fortress towers with banners |
| **Gold Mines** | ⛏️ | Pickaxe with ore chunk |
| **Farms** | 🌾 | Wheat bundle |
| **Mana Shrines** | ✨ | Crystal shard with glow |
| **Ruins** | 🏛️ | Broken columns |
| **Strongholds** | 🛡️ | Fortress with spikes |

#### **Commander Icons**
- **Frame Style**: Shield or medallion borders
- **Portrait Area**: Circular inset with character art
- **Class Indicators**: Small symbols in corners
- **Rank Markings**: Battle scars, decorations

#### **Resource Bar Styles**
- **Chunky metallic frames** with inlaid visuals
- **Gold**: Coin stack icons
- **Supplies**: Wooden crate symbols
- **Mana**: Crystal fragments
- **Knowledge**: Scroll/book icons

### **Icon Implementation**
```css
.game-icon {
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.8));
  transition: all 0.3s ease;
}

.game-icon:hover {
  filter:
    drop-shadow(0 0 8px rgba(230, 126, 34, 0.6))
    drop-shadow(1px 1px 2px rgba(0,0,0,0.8));
  transform: scale(1.1);
}
```

---

## ⚔️ **Battle Preparation Screen**

### **Layout Composition**
**Background**: War camp at dusk with firelight, smoke, and banner silhouettes

#### **Main Panel Structure**
```
┌─────────────────────────────────────┐
│  BATTLE PREPARATION                 │
├─────────┬─────────────┬─────────────┤
│ YOUR    │   VS.       │ ENEMY       │
│ FORCES  │             │ FORCES      │
├─────────┴─────────────┴─────────────┤
│         ATTACK BUTTON               │
└─────────────────────────────────────┘
```

#### **Component Specifications**

**Commander Portrait**:
- Circular shield frame with scratches
- Metal rim with battle damage
- Portrait shows expression/mood

**Enemy Preview**:
- Displayed on tattered red banner
- Partially obscured/mysterious
- Intimidating presentation

**Attack Button**:
- Large forged steel appearance
- Glowing ember-orange highlights
- Hammer-hit animation on press
- Sound: Metallic clank

**Troop Display**:
- Carved-wood panels
- Engraved unit icons
- Formation visualization

---

## ✨ **Special Effects & Animations**

### **Particle Effects**

#### **Ember Sparks**
```css
@keyframes emberDrift {
  0% {
    opacity: 0.8;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.5);
  }
}
```
- Drift near highlighted buttons
- Golden-orange color (`#E67E22`)
- Random timing and paths

#### **Heat Shimmer**
- Behind critical alerts and danger buttons
- Subtle distortion effect
- CSS filter or canvas implementation

#### **Smoke Wisps**
- Background ambient effect
- Dark grey particles (`#2B2B2C`)
- Slow upward drift

### **UI Animations**

#### **Panel Entrance**
```css
@keyframes panelSlide {
  from {
    transform: translateX(-100%) rotateY(-15deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(0);
    opacity: 1;
  }
}
```

#### **Notification Appearance**
```css
@keyframes parchmentSlap {
  0% {
    transform: rotate(-5deg) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: rotate(2deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}
```

#### **Button Impact**
```css
@keyframes metalImpact {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
```

---

## 🔊 **Audio Design Cues**

### **Interaction Sounds**
| Action | Sound | Description |
|--------|-------|-------------|
| **Button Press** | Metallic clank | Heavy metal-on-metal |
| **Panel Open** | Stone grinding | Heavy slab sliding |
| **Node Capture** | Horn blast + war drum | Victory fanfare |
| **Error/Denial** | Muffled thud | Chain rattle |
| **Hover** | Soft metal scrape | Subtle feedback |
| **Critical Alert** | Deep horn | Ominous warning |

### **Ambient Audio**
- Distant battle sounds
- Crackling fires
- Wind through ruins
- Occasional war drums

---

## 📱 **Layout Examples**

### **Main Menu Layout**
```
     ╔═══════════════════════════════════╗
     ║        ASHES OF AELORIA           ║
     ║     (Embossed Bronze Letters)     ║
     ╠═══════════════╤═══════════════════╣
     ║   [CAMPAIGN]  │   [BATTLE MODE]   ║
     ║               │                   ║
     ║   [SETTINGS]  │   [CODEX]         ║
     ║               │                   ║
     ║   [EXIT]      │   [ACHIEVEMENTS]  ║
     ╚═══════════════╧═══════════════════╝
```

### **Node Map Layout**
```
┌─────────────────────────────────────────┐
│ ⚔️ Ashes of Aeloria    📖 Campaign     │
├─────────────────────────────────────────┤
│                                         │
│    🏰──⛏️──🌾     Legend:               │
│     │   │   │     🏰 Cities             │
│     │   │   │     ⛏️ Mines              │
│    ✨──🏛️──🛡️     🌾 Farms              │
│                   ✨ Shrines            │
│                   🏛️ Ruins              │
│                   🛡️ Strongholds        │
└─────────────────────────────────────────┘
```

### **Commander Screen Layout**
```
╔══════════════════════════════════════════╗
║  👤 COMMANDER PROFILE                    ║
╠══════════════════════════════════════════╣
║                                          ║
║  ┌─────────┐  Name: Sir Roderick         ║
║  │ [PHOTO] │  Class: Knight               ║
║  │ SHIELD  │  Level: 15                   ║
║  │ FRAME   │  Experience: 2,450/3,000     ║
║  └─────────┘                             ║
║                                          ║
║  ⚔️ Attack: 85    🛡️ Defense: 120       ║
║  ❤️ Health: 180/200                      ║
║                                          ║
║  📜 ABILITIES:                           ║
║  • Shield Wall (Active)                  ║
║  • Battle Cry (Cooldown: 2 turns)       ║
║                                          ║
╚══════════════════════════════════════════╝
```

---

## 🎨 **CSS Framework Structure**

### **CSS Custom Properties**
```css
:root {
  /* Color Palette */
  --color-primary-dark: #1E1E20;
  --color-primary: #2B2B2C;
  --color-bronze: #7B4F2E;
  --color-steel: #6C6C6C;
  --color-blood: #A93226;
  --color-ember: #E67E22;
  --color-parchment: #D7C7A0;
  --color-bone: #EDEADE;
  --color-mana: #3498DB;
  --color-teal: #1ABC9C;

  /* Typography */
  --font-title: 'Cinzel Decorative', serif;
  --font-body: 'Merriweather Sans', sans-serif;
  --font-accent: 'IM Fell English SC', serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Shadows */
  --shadow-panel: 0 2px 4px rgba(0,0,0,0.3);
  --shadow-button: inset 0 1px 0 rgba(255,255,255,0.1);
  --shadow-glow: 0 0 8px rgba(230, 126, 34, 0.4);
}
```

### **Component Classes**
```css
/* Panel Base */
.frontier-panel {
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-dark));
  border: 2px solid var(--color-bronze);
  border-radius: 4px;
  box-shadow: var(--shadow-panel), var(--shadow-button);
  padding: var(--space-md);
}

/* Button Base */
.frontier-button {
  background: linear-gradient(135deg, var(--color-steel), var(--color-primary));
  border: 2px solid var(--color-bronze);
  color: var(--color-bone);
  font-family: var(--font-body);
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  transition: all 0.2s ease;
  cursor: pointer;
}

.frontier-button:hover {
  border-color: var(--color-ember);
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

/* Typography */
.frontier-title {
  font-family: var(--font-title);
  color: var(--color-bronze);
  text-transform: uppercase;
  font-weight: bold;
}

.frontier-text {
  font-family: var(--font-body);
  color: var(--color-parchment);
  line-height: 1.6;
}
```

---

## 📐 **Implementation Guidelines**

### **Development Priorities**
1. **Establish base color system** with CSS custom properties
2. **Create panel/container components** with consistent styling
3. **Implement button variations** for different actions
4. **Design icon system** with consistent styling
5. **Add animation framework** for transitions and effects
6. **Integrate audio cues** for interactions

### **Performance Considerations**
- Use CSS transforms over position changes
- Implement particle effects with requestAnimationFrame
- Optimize texture images for web delivery
- Use system fonts as fallbacks

### **Accessibility Requirements**
- Maintain 4.5:1 contrast ratio minimum
- Provide alternative text for decorative elements
- Ensure keyboard navigation works with custom styling
- Include reduced motion preferences

### **Browser Compatibility**
- Support CSS Grid and Flexbox
- Use PostCSS for vendor prefixes
- Provide graceful degradation for older browsers
- Test on mobile devices for touch interactions

---

## 🏗️ **Component Library Structure**

```
src/
├── styles/
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── colors.css
│   ├── components/
│   │   ├── panels.css
│   │   ├── buttons.css
│   │   ├── icons.css
│   │   └── animations.css
│   └── themes/
│       └── frontier.css
├── components/
│   ├── ui/
│   │   ├── FrontierPanel.tsx
│   │   ├── FrontierButton.tsx
│   │   ├── GameIcon.tsx
│   │   └── BattleCard.tsx
│   └── layout/
│       ├── GameHeader.tsx
│       ├── NodeMap.tsx
│       └── CommanderPanel.tsx
└── assets/
    ├── textures/
    ├── icons/
    └── audio/
```

This style guide provides the foundation for creating a cohesive, immersive UI that captures the gritty, battle-hardened aesthetic of Ashes of Aeloria while maintaining usability and accessibility standards.
