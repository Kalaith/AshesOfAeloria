# Ashes of Aeloria

Ashes of Aeloria is a turn-based fantasy strategy campaign about rebuilding a fallen realm after a magical catastrophe. Players move through story chapters, secure territory on a node map, recruit commanders, gather resources, and make campaign choices that shape the restoration of Aeloria.

The game is part of the WebHatchery game collection and uses shared Web Hatchery authentication for saved campaigns and guest play.

## Gameplay Overview

Ashes of Aeloria is organized around campaign missions. Each mission has a theme, estimated turn range, core challenge, victory objectives, story events, and rewards. The first chapter, "The Awakening," starts with survival and discovery; later chapters introduce broader rebuilding, diplomacy, research, and endgame victory paths.

During a mission, the player manages a strategic map of strongholds and resource sites. Nodes can produce war coffers, war supplies, and arcane power, while commanders can be recruited, assigned, recalled, and used to push into hostile territory.

## Core Loop

1. Choose or continue a campaign mission.
2. Review the map, treasury, commanders, and selected stronghold details.
3. Spend resources to recruit commanders, fortify positions, or attack connected nodes.
4. End the turn to let the backend resolve campaign progression.
5. React to story events, enemy pressure, and changing objectives.
6. Complete mission objectives to advance the restoration campaign.

## Campaign Missions

Mission cards show the chapter title, subtitle, star rating, expected turn count, mission objectives, and current status.

Current campaign data includes:
- Chapter objectives such as territory control, population growth, research, resources, alliances, buildings, and special story goals.
- Story events that trigger by turn, territory, research, population, diplomacy, or random conditions.
- Special mission rules that alter chapter behavior.
- Rewards such as resources, commanders, research unlocks, buildings, and legacy bonuses.

## Map And Strongholds

The battlefield is a connected-node campaign map. Each node has an owner, garrison, star level, type, and connections that define where attacks can happen.

Node types include:
- City: produces gold and supplies and supports recruitment.
- Resource Node: produces valuable campaign supplies.
- Fortress: offers stronger defensive value.
- Shrine: produces arcane power.
- Enemy Stronghold: a heavily defended hostile position.

Selecting a node opens tactical details such as owner, garrison, income, commander capacity, upgrade options, and available assault targets.

## Resources

The visible campaign treasury focuses on:
- War Coffers: the primary economic resource for upgrades and recruitment.
- War Supplies: logistics and military support.
- Arcane Power: magical capacity from shrines and other sources.

Additional long-form campaign systems also model knowledge, culture, influence, materials, food, energy, artifacts, research, population, diplomacy, corruption, exploration, and legacy progress.

## Commanders

Commanders are the main force multipliers on the map. They can be recruited, selected, assigned to player-controlled nodes, recalled, and used to strengthen attacks or defense.

Commander classes include:
- Knight: defensive frontline commander with Shield Wall.
- Mage: magical support commander with area damage.
- Ranger: scout and skirmisher with mobility utility.
- Warlord: army leader with campaign-wide combat bonuses.

Commanders also have race traits, health, attack, defense, experience, army composition, and assignment status.

## Story And Choices

Story events represent crises, opportunities, faction moments, discoveries, and late-game victory path decisions. Events can have requirements and consequences, including resource changes, diplomatic shifts, narrative flags, unlocks, and victory progress.

The campaign supports multiple restoration philosophies, including harmony, ascension, and dominion-oriented paths.

## Saving And Accounts

Ashes of Aeloria uses shared Web Hatchery authentication.

- Signed-in players load and save through their Web Hatchery account.
- Guest players can start a browser-local guest session.
- Guest progress can be merged into a Web Hatchery account when both sessions are available.
- The backend is authoritative for game state and gameplay actions.

The frontend should display game data and submit player intent. Resource changes, turn advancement, mission state, combat, and save persistence belong on the server.

## Running The Game

Required environment variables must be set before running or building. Do not rely on fallback defaults.

Frontend:
- `VITE_API_BASE_URL`
- `VITE_WEB_HATCHERY_LOGIN_URL`

Backend configuration is PHP-based and should fail fast when required config is missing.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Common scripts:
- `npm run dev` - start the Vite development server.
- `npm run build` - type-check and build production assets.
- `npm run type-check` - run TypeScript checks.
- `npm run lint` - run ESLint.
- `npm run preview` - preview the built frontend.

### Backend

```powershell
cd backend
composer install
composer start
```

Common scripts:
- `composer test` - run backend tests.
- `composer cs-check` - check PHP coding standards.
- `composer cs-fix` - apply PHP coding standard fixes.

## Project Structure

```text
ashes_of_aeloria/
├── backend/                  # PHP API, actions, services, repositories, routing
├── frontend/                 # React/TypeScript game client
├── Ashes_of_Aeloria_Game_Design_Document.md
├── UI_STYLE_GUIDE.md
├── CODE_REVIEW.md
└── README.md
```

Frontend highlights:

```text
frontend/src/
├── api/          # Axios client and backend service calls
├── auth/         # Web Hatchery and guest session helpers
├── components/   # Game UI, layout, feature panels, modals
├── data/         # Static campaign, story, and game definitions
├── hooks/        # Game, campaign, modal, and notification hooks
├── providers/    # Shared game context
├── stores/       # Zustand stores for client presentation state
├── types/        # TypeScript game types
├── utils/        # Shared calculations and helpers
└── styles/       # Global theme and frontier war UI styling
```

Backend highlights:

```text
backend/src/
├── Actions/       # Gameplay and persistence use cases
├── Controllers/   # Thin HTTP handlers
├── Core/          # Routing, database, service factory
├── Models/        # DTO-style models
├── Repositories/  # PDO data access
└── Services/      # Auth, game engine, and shared business services
```

## Development Notes

- Keep gameplay rules server-authoritative.
- Do not add default values for required environment variables.
- Do not implement local login flows; use shared Web Hatchery Login.
- Keep controllers thin and move business logic into actions or services.
- Keep React components presentational where possible and route API calls through the centralized API layer.

## Deployment

The repository includes `publish.ps1` for deployment:

```powershell
.\publish.ps1
.\publish.ps1 -ftp
.\publish.ps1 -ftp -Clean -Verbose
```

Production deployment must use explicit environment configuration. Missing required config should fail early instead of silently falling back.
