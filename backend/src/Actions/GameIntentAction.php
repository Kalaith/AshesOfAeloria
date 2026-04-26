<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\AuthUser;
use App\Repositories\GameRepository;
use App\Services\GameEngineService;
use DomainException;

final class GameIntentAction
{
    public function __construct(
        private readonly GameRepository $gameRepository,
        private readonly GameEngineService $gameEngine
    ) {
    }

    public function execute(AuthUser $user, string $type, array $body): array
    {
        $state = $this->gameRepository->loadOrCreateState($user, $this->gameEngine->initialState());
        $payload = $body['payload'] ?? [];
        if (!is_array($payload)) {
            throw new DomainException('Action payload must be an object.');
        }

        $nextState = $this->gameEngine->presentState($this->gameEngine->apply($state, $type, $payload));
        return $this->gameRepository->replaceGameState($user, $nextState);
    }
}
