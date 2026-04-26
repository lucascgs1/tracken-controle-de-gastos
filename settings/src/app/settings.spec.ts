import { TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings';
import { SettingsService } from './services/settings.service';
import { provideTrackenTransloco } from '@tracken/shared';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let settingsServiceMock: { isHome: any; menuItems: any[] };

	beforeEach(async () => {
		settingsServiceMock = {
			isHome: signal(true),
			menuItems: [],
		};

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, SettingsComponent],
			providers: [
				{ provide: SettingsService, useValue: settingsServiceMock },
				provideTrackenTransloco(),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		}).compileComponents();

		const fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
