import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackenPageHeader, TrackenAnimateDirective } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-settings-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	imports: [
		CommonModule,
		RouterModule,
		TrackenPageHeader,
		TrackenAnimateDirective,
		TranslocoDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsHomeComponent {
	menuItems = [
		{
			id: 'profile',
			icon: 'person',
			route: 'profile',
			titleKey: 'settings.profile',
			descriptionKey: 'settings.profileDesc',
		},
		{
			id: 'appearance',
			icon: 'palette',
			route: 'appearance',
			titleKey: 'settings.preferences',
			descriptionKey: 'settings.appearanceDesc',
		},
		{
			id: 'security',
			icon: 'lock_person',
			route: 'security',
			titleKey: 'settings.account',
			descriptionKey: 'settings.securityDesc',
		},
	];
}
