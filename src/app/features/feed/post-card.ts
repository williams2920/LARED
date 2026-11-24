import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Agent, Post } from '@core/data/models';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-post-card',
  imports: [Avatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  readonly post = input.required<Post>();

  protected readonly liked = signal(false);
  protected readonly saved = signal(false);
  protected readonly likes = computed(() => this.post().likes + (this.liked() ? 1 : 0));
  protected readonly agent = computed(() =>
    this.post().isAgent ? (this.post().author as Agent) : null,
  );
}
