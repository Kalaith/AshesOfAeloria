<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\AuthUser;
use App\Repositories\GameRepository;
use App\Services\GameEngineService;

final class LoadGameAction
{
    public function __construct(
        private readonly GameRepository $gameRepository,
        private readonly GameEngineService $gameEngine
    ) {
    }

    public function execute(AuthUser $user): array
    {
        $this->gameRepository->loadOrCreateState($user, $this->gameEngine->initialState());
        return $this->gameRepository->loadGame($user);
    }
}
