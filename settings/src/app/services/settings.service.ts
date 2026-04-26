import { Injectable, inject, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

export interface MenuItem {
	id: string;
	icon: string;
	titleKey: string;
	descriptionKey: string;
	route: string;
}

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	private router = inject(Router);

	// Transforma eventos de navegação em um sinal reativo
	private currentUrl = toSignal(
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map((event) => (event as NavigationEnd).url),
		),
		{ initialValue: this.router.url },
	);

	// Lógica centralizada de visibilidade
	isHome = computed(() => {
		const url = this.currentUrl();
		return url === '/settings' || url === '/settings/';
	});

	menuItems: MenuItem[] = [
		{
			id: 'profile',
			icon: 'person',
			titleKey: 'settings.profile',
			descriptionKey: 'settings.profileDesc',
			route: 'profile',
		},
		{
			id: 'appearance',
			icon: 'palette',
			titleKey: 'settings.appearance',
			descriptionKey: 'settings.appearanceDesc',
			route: 'appearance',
		},
		{
			id: 'security',
			icon: 'security',
			titleKey: 'settings.security',
			descriptionKey: 'settings.securityDesc',
			route: 'security',
		},
		{
			id: 'customization',
			icon: 'tune',
			titleKey: 'settings.customization',
			descriptionKey: 'settings.customizationDesc',
			route: 'customization',
		},
	];
}
