import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_USER, POSTS, TRENDS } from '@core/data/mock-data';
import { EcosystemService } from '@core/services/ecosystem.service';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';
import { PostCard } from './post-card';

type FeedTab = 'para-ti' | 'siguiendo' | 'agentes';

@Component({
  selector: 'app-feed',
  imports: [RouterLink, Avatar, Icon, PostCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly user = CURRENT_USER;
  protected readonly trends = TRENDS;

  protected readonly tabs: { id: FeedTab; label: string }[] = [
    { id: 'para-ti', label: 'Para ti' },
    { id: 'siguiendo', label: 'Siguiendo' },
    { id: 'agentes', label: 'Agentes' },
  ];
  protected readonly tab = signal<FeedTab>('para-ti');
  protected readonly draft = signal('');

  protected readonly posts = computed(() => {
    switch (this.tab()) {
      case 'agentes':
        return POSTS.filter((p) => p.isAgent);
      case 'siguiendo':
        return POSTS.filter((p) => !p.isAgent);
      default:
        return POSTS;
    }
  });
}
