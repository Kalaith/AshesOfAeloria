<?php

declare(strict_types=1);

namespace App\Core;

use App\Actions\LinkGuestAccountAction;
use App\Actions\LoadGameAction;
use App\Actions\GameIntentAction;
use App\Actions\SaveGameAction;
use App\Controllers\AuthController;
use App\Controllers\GameController;
use App\Controllers\SystemController;
use App\Repositories\GameRepository;
use App\Services\GameEngineService;
use PDO;

final class ServiceFactory
{
    private ?PDO $db = null;
    private ?GameRepository $gameRepository = null;
    private ?GameEngineService $gameEngine = null;

    public function create(string $class): object
    {
        return match ($class) {
            AuthController::class => new AuthController(
                fn (): LinkGuestAccountAction => $this->linkGuestAccountAction()
            ),
            GameController::class => new GameController(
                $this->loadGameAction(),
                $this->saveGameAction(),
                $this->gameIntentAction()
            ),
            SystemController::class => new SystemController(),
            default => new $class(),
        };
    }

    private function db(): PDO
    {
        return $this->db ??= Database::getConnection();
    }

    private function gameRepository(): GameRepository
    {
        return $this->gameRepository ??= new GameRepository($this->db());
    }

    private function loadGameAction(): LoadGameAction
    {
        return new LoadGameAction($this->gameRepository(), $this->gameEngine());
    }

    private function saveGameAction(): SaveGameAction
    {
        return new SaveGameAction();
    }

    private function gameIntentAction(): GameIntentAction
    {
        return new GameIntentAction($this->gameRepository(), $this->gameEngine());
    }

    private function linkGuestAccountAction(): LinkGuestAccountAction
    {
        return new LinkGuestAccountAction($this->gameRepository());
    }

    private function gameEngine(): GameEngineService
    {
        return $this->gameEngine ??= new GameEngineService();
    }
}
