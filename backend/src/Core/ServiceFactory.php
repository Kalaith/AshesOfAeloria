<?php

declare(strict_types=1);

namespace App\Core;

use App\Actions\LinkGuestAccountAction;
use App\Actions\LoadGameAction;
use App\Actions\SaveGameAction;
use App\Controllers\AuthController;
use App\Controllers\GameController;
use App\Controllers\SystemController;
use App\Repositories\GameRepository;
use PDO;

final class ServiceFactory
{
    private ?PDO $db = null;
    private ?GameRepository $gameRepository = null;

    public function create(string $class): object
    {
        return match ($class) {
            AuthController::class => new AuthController(
                fn (): LinkGuestAccountAction => $this->linkGuestAccountAction()
            ),
            GameController::class => new GameController($this->loadGameAction(), $this->saveGameAction()),
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
        return new LoadGameAction($this->gameRepository());
    }

    private function saveGameAction(): SaveGameAction
    {
        return new SaveGameAction($this->gameRepository());
    }

    private function linkGuestAccountAction(): LinkGuestAccountAction
    {
        return new LinkGuestAccountAction($this->gameRepository());
    }
}
