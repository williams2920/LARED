import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AGENTS, INTEGRATIONS } from '@core/data/mock-data';
import { NAV_ITEMS } from '@core/navigation/navigation';
import { CommandPaletteService } from '@core/services/command-palette.service';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icons';

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: IconName;
  path: string;
}

const BASE_COMMANDS: Command[] = [
  ...NAV_ITEMS.map((i) => ({
    id: `nav-${i.path}`,
    group: 'Ir a',
    label: i.label,
    icon: i.icon,
    path: i.path,
  })),
  ...AGENTS.map((a) => ({
    id: `agent-${a.id}`,
    group: 'Agentes',
    label: a.name,
    hint: a.category,
    icon: a.icon,
    path: '/agentes',
  })),
  ...INTEGRATIONS.map((i) => ({
    id: `int-${i.id}`,
    group: 'Integraciones',
    label: i.name,
    hint: i.category,
    icon: 'plug' as IconName,
    path: '/integraciones',
  })),
];

/** Paleta de comandos global (Ctrl/⌘ + K): el punto central para llegar a todo. */
@Component({
  selector: 'app-command-palette',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss',
  host: {
    '(document:keydown)': 'onGlobalKeydown($event)',
  },
})
export class CommandPalette {
  protected readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  protected readonly query = signal('');
  protected readonly activeIndex = signal(0);

  protected readonly results = computed<Command[]>(() => {
    const q = this.query().trim().toLowerCase();
    const matches = q
      ? BASE_COMMANDS.filter((c) => `${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q))
      : BASE_COMMANDS.filter((c) => c.group !== 'Integraciones');
    const ask: Command[] = q
      ? [
          {
            id: 'ask',
            group: 'Preguntar',
            label: `Preguntar a Nexus: “${this.query().trim()}”`,
            icon: 'sparkles',
            path: '/agentes',
          },
        ]
      : [];
    return [...ask, ...matches].slice(0, 12);
  });

  protected readonly groups = computed(() => {
    const map = new Map<string, { cmd: Command; index: number }[]>();
    this.results().forEach((cmd, index) => {
      map.set(cmd.group, [...(map.get(cmd.group) ?? []), { cmd, index }]);
    });
    return [...map.entries()].map(([name, items]) => ({ name, items }));
  });

  constructor() {
    effect(() => this.input()?.nativeElement.focus());
  }

  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.palette.toggle();
      this.reset();
    } else if (event.key === 'Escape' && this.palette.isOpen()) {
      this.close();
    }
  }

  protected onInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    const total = this.results().length;
    if (!total) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((i) => (i + 1) % total);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((i) => (i - 1 + total) % total);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.run(this.results()[this.activeIndex()]);
    }
  }

  protected run(cmd: Command): void {
    this.close();
    void this.router.navigateByUrl(cmd.path);
  }

  protected close(): void {
    this.palette.close();
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.activeIndex.set(0);
  }
}
