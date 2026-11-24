import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMUNITIES, TRENDS } from '@core/data/mock-data';
import { CommandPaletteService } from '@core/services/command-palette.service';
import { EcosystemService } from '@core/services/ecosystem.service';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-explore',
  imports: [RouterLink, PageHeader, Avatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class Explore {
  protected readonly palette = inject(CommandPaletteService);
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly communities = COMMUNITIES;
  protected readonly trends = TRENDS;
}
