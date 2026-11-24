import { Injectable, computed, signal } from '@angular/core';
import { AGENTS, DEFAULT_CONNECTED, INTEGRATIONS } from '@core/data/mock-data';

/** Estado de agentes e integraciones conectados (en memoria; reemplazar por API). */
@Injectable({ providedIn: 'root' })
export class EcosystemService {
  readonly agents = AGENTS;
  readonly integrations = INTEGRATIONS;

  readonly connectedIntegrations = signal(new Set(DEFAULT_CONNECTED));
  readonly connectedAgents = signal(new Set(['nexus', 'forja']));

  readonly connectedIntegrationCount = computed(() => this.connectedIntegrations().size);
  readonly activeAgents = computed(() =>
    this.agents.filter((a) => this.connectedAgents().has(a.id)),
  );

  toggleIntegration(id: string): void {
    this.connectedIntegrations.update((set) => toggle(set, id));
  }

  toggleAgent(id: string): void {
    this.connectedAgents.update((set) => toggle(set, id));
  }
}

function toggle(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}
