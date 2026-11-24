import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NAV_ITEMS, MOBILE_NAV } from '@core/navigation/navigation';
import { CommandPaletteService } from '@core/services/command-palette.service';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the sidebar navigation and mobile bottom nav', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-sidebar .nav__link').length).toBe(NAV_ITEMS.length);
    expect(el.querySelectorAll('app-bottom-nav .item').length).toBe(MOBILE_NAV.length);
  });

  it('should open the command palette with Ctrl+K', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    await fixture.whenStable();
    expect(TestBed.inject(CommandPaletteService).isOpen()).toBe(true);
    expect((fixture.nativeElement as HTMLElement).querySelector('[role="dialog"]')).toBeTruthy();
  });
});
