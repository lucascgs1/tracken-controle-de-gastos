import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackenPageHeader, TrackenPage } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';
import { SettingsService } from './services/settings.service';

@Component({
	standalone: true,
	selector: 'app-settings',
	templateUrl: './settings.html',
	styleUrl: './settings.scss',
	imports: [
		CommonModule,
		RouterOutlet,
		RouterModule,
		TrackenPageHeader,
		TrackenPage,
		TranslocoDirective,
	],
})
export class SettingsComponent {
	private settingsService = inject(SettingsService);

	isHome = this.settingsService.isHome;
	menuItems = this.settingsService.menuItems;
}
