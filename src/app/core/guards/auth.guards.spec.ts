import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthRepository } from '@core/domain/auth.repository';
import { provideInMemoryBackend } from '../../../testing/in-memory-backend';
import { authGuard, guestGuard } from './auth.guards';

const run = (guard: typeof authGuard, url = '/agentes') =>
  TestBed.runInInjectionContext(() =>
    guard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot),
  ) as Promise<boolean | UrlTree>;

describe('auth guards', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideInMemoryBackend()] }),
  );

  it('redirects anonymous users to /login keeping the target url', async () => {
    const result = await run(authGuard);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(
      '/login?redirect=%2Fagentes',
    );
  });

  it('lets signed-in users through and keeps them away from /login', async () => {
    await TestBed.inject(AuthRepository).signInWithEmail('ada@lared.dev', 'secret');
    expect(await run(authGuard)).toBe(true);
    expect(TestBed.inject(Router).serializeUrl((await run(guestGuard)) as UrlTree)).toBe('/');
  });
});
