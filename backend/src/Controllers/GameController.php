<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Actions\LoadGameAction;
use App\Actions\GameIntentAction;
use App\Actions\SaveGameAction;
use App\Core\Request;
use App\Core\Response;
use App\Models\AuthUser;

final class GameController
{
    public function __construct(
        private readonly LoadGameAction $loadGameAction,
        private readonly SaveGameAction $saveGameAction,
        private readonly GameIntentAction $gameIntentAction
    ) {
    }

    public function current(Request $request, Response $response): void
    {
        $response->success($this->loadGameAction->execute(
            AuthUser::fromArray($request->getAttribute('auth_user', []))
        ));
    }

    public function save(Request $request, Response $response): void
    {
        $response->success($this->saveGameAction->execute(
            AuthUser::fromArray($request->getAttribute('auth_user', [])),
            $request->getBody()
        ));
    }

    public function action(Request $request, Response $response): void
    {
        $response->success($this->gameIntentAction->execute(
            AuthUser::fromArray($request->getAttribute('auth_user', [])),
            (string) $request->getAttribute('action_type', ''),
            $request->getBody()
        ));
    }
}
