import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TRENDS } from '@core/data/catalog';
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
  protected readonly communities = this.ecosystem.communities;
  protected readonly trends = TRENDS;
}
