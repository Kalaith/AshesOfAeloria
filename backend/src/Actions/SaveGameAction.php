<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\AuthUser;
use DomainException;

final class SaveGameAction
{
    public function __construct()
    {
    }

    public function execute(AuthUser $user, array $body): array
    {
        throw new DomainException('Direct game_state saves are disabled. Use authoritative game action endpoints.');
    }
}
