import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FeedPost } from '@core/domain/post.model';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';

/**
 * Tarjeta de publicación. Componente de presentación: recibe el estado por inputs y
 * emite intenciones; no conoce servicios ni persistencia (SRP).
 */
@Component({
  selector: 'app-post-card',
  imports: [Avatar, Icon, TimeAgoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  readonly post = input.required<FeedPost>();
  readonly liked = input(false);
  readonly saved = input(false);
  readonly own = input(false);

  readonly like = output<void>();
  readonly save = output<void>();
  readonly remove = output<void>();
  readonly ask = output<void>();
}
