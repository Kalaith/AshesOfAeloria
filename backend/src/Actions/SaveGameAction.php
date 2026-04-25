<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\AuthUser;
use App\Repositories\GameRepository;
use DomainException;

final class SaveGameAction
{
    public function __construct(private readonly GameRepository $gameRepository)
    {
    }

    public function execute(AuthUser $user, array $body): array
    {
        $gameState = $body['game_state'] ?? null;
        if (!is_array($gameState)) {
            throw new DomainException('Missing game_state payload.');
        }

        return $this->gameRepository->saveGame($user, $gameState);
    }
}
