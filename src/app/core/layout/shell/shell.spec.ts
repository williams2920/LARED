import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthRepository } from '@core/domain/auth.repository';
import { MOBILE_NAV, NAV_ITEMS } from '@core/navigation/navigation';
import { CommandPaletteService } from '@core/services/command-palette.service';
import {
  InMemoryAuthRepository,
  provideInMemoryBackend,
} from '../../../../testing/in-memory-backend';
import { Shell } from './shell';

describe('Shell', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Shell],
      providers: [provideRouter([{ path: 'login', children: [] }]), provideInMemoryBackend()],
    });
    await TestBed.inject(AuthRepository).signInWithEmail('ada@lared.dev', 'secret');
  });

  it('renders the sidebar navigation, the signed-in user and the mobile bottom nav', async () => {
    const fixture = TestBed.createComponent(Shell);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-sidebar .nav__link').length).toBe(NAV_ITEMS.length);
    expect(el.querySelectorAll('app-bottom-nav .item').length).toBe(MOBILE_NAV.length);
    expect(el.querySelector('app-sidebar .user')?.textContent).toContain('@ada');
  });

  it('opens the command palette with Ctrl+K', async () => {
    const fixture = TestBed.createComponent(Shell);
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    await fixture.whenStable();
    expect(TestBed.inject(CommandPaletteService).isOpen()).toBe(true);
    expect((fixture.nativeElement as HTMLElement).querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('signs out from the sidebar', async () => {
    const fixture = TestBed.createComponent(Shell);
    await fixture.whenStable();
    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('[aria-label="Cerrar sesión"]')!
      .click();
    await fixture.whenStable();
    expect((TestBed.inject(AuthRepository) as InMemoryAuthRepository).state.value).toBeNull();
  });
});
