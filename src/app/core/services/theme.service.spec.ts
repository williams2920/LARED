import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());

  it('toggles the theme and applies it to <html>', () => {
    localStorage.setItem('lared-theme', 'light');
    const service = TestBed.inject(ThemeService);
    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('lared-theme')).toBe('dark');
  });
});
