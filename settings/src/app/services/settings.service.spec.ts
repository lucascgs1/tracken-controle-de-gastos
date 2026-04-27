import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import { Router, NavigationEnd } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { Subject } from 'rxjs';

describe('SettingsService', () => {
	let service: SettingsService;
	let routerEvents: Subject<import('@angular/router').Event>;
	let routerMock: { events: Subject<import('@angular/router').Event>; url: string };

	beforeEach(() => {
		routerEvents = new Subject();
		routerMock = {
			events: routerEvents,
			url: '/settings',
		};

		TestBed.configureTestingModule({
			providers: [SettingsService, { provide: Router, useValue: routerMock }],
		});
		service = TestBed.inject(SettingsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should identify home route correctly', () => {
		expect(service.isHome()).toBe(true);

		routerEvents.next(new NavigationEnd(1, '/settings/profile', '/settings/profile'));

		expect(service.isHome()).toBe(false);
	});

	it('should have menu items', () => {
		expect(service.menuItems.length).toBeGreaterThan(0);
	});
});
