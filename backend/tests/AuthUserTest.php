<?php

declare(strict_types=1);

namespace Tests;

use App\Models\AuthUser;
use PHPUnit\Framework\TestCase;

final class AuthUserTest extends TestCase
{
    public function testBuildsGuestAuthUserFromArray(): void
    {
        $user = AuthUser::fromArray([
            'id' => 'guest_123',
            'username' => 'Guest 123',
            'display_name' => 'Guest 123',
            'roles' => ['guest'],
            'is_guest' => true,
            'auth_type' => 'guest',
        ]);

        self::assertSame('guest_123', $user->id);
        self::assertTrue($user->isGuest);
        self::assertSame('guest', $user->authType);
        self::assertSame(['guest'], $user->roles);
    }
}
