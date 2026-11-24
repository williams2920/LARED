import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_USER, POSTS, TRENDS } from '@core/data/mock-data';
import { Post } from '@core/data/models';
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
  private readonly allPosts = signal<Post[]>(POSTS);

  protected readonly posts = computed(() => {
    switch (this.tab()) {
      case 'agentes':
        return this.allPosts().filter((p) => p.isAgent);
      case 'siguiendo':
        return this.allPosts().filter((p) => !p.isAgent);
      default:
        return this.allPosts();
    }
  });

  protected publish(): void {
    const content = this.draft().trim();
    if (!content) return;
    const post: Post = {
      id: `local-${Date.now()}`,
      author: CURRENT_USER,
      time: 'ahora',
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
    };
    this.allPosts.update((posts) => [post, ...posts]);
    this.draft.set('');
    this.tab.set('para-ti');
  }
}
