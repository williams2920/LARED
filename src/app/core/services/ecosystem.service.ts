import { computed, inject, Injectable } from '@angular/core';
import { AGENTS, COMMUNITIES, INTEGRATIONS } from '@core/data/catalog';
import { ProfileService } from './profile.service';

/**
 * Catálogo de agentes, integraciones y comunidades, cruzado con lo que el usuario tiene
 * conectado en su perfil. El catálogo es estático; el estado de conexión se persiste.
 */
@Injectable({ providedIn: 'root' })
export class EcosystemService {
  private readonly profiles = inject(ProfileService);

  readonly agents = AGENTS;
  readonly integrations = INTEGRATIONS;
  readonly communities = COMMUNITIES;

  readonly connectedAgents = computed(() => new Set(this.profiles.profile()?.connectedAgents));
  readonly connectedIntegrations = computed(
    () => new Set(this.profiles.profile()?.connectedIntegrations),
  );
  readonly joinedCommunities = computed(() => new Set(this.profiles.profile()?.joinedCommunities));

  readonly connectedIntegrationCount = computed(
    () => this.integrations.filter((i) => this.connectedIntegrations().has(i.id)).length,
  );
  readonly activeAgents = computed(() =>
    this.agents.filter((a) => this.connectedAgents().has(a.id)),
  );

  toggleAgent(id: string): Promise<void> {
    return this.profiles.toggle('connectedAgents', id);
  }

  toggleIntegration(id: string): Promise<void> {
    return this.profiles.toggle('connectedIntegrations', id);
  }

  toggleCommunity(id: string): Promise<void> {
    return this.profiles.toggle('joinedCommunities', id);
  }
}
