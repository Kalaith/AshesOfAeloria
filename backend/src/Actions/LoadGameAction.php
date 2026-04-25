<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\AuthUser;
use App\Repositories\GameRepository;

final class LoadGameAction
{
    public function __construct(private readonly GameRepository $gameRepository)
    {
    }

    public function execute(AuthUser $user): array
    {
        return $this->gameRepository->loadGame($user);
    }
}
