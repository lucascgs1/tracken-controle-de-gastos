import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ThemeService', () => {
	let service: ThemeService;

	beforeEach(() => {
		// Mock localStorage
		const store: Record<string, string> = {};
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => (store[key] = value),
			clear: () => {
				for (const key in store) delete store[key];
			},
		});

		// Setup meta tag if it doesn't exist
		if (!document.querySelector('meta[name="theme-color"]')) {
			const meta = document.createElement('meta');
			meta.setAttribute('name', 'theme-color');
			document.head.appendChild(meta);
		}

		TestBed.configureTestingModule({
			providers: [ThemeService],
		});
		service = TestBed.inject(ThemeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize with light theme if localStorage is empty', () => {
		expect(service.theme()).toBe('light');
	});

	it('should toggle theme correctly', () => {
		service.toggleTheme(); // light -> dark
		expect(service.theme()).toBe('dark');
		service.toggleTheme(); // dark -> midnight
		expect(service.theme()).toBe('midnight');
		service.toggleTheme(); // midnight -> light
		expect(service.theme()).toBe('light');
	});

	it('should set specific theme', () => {
		service.setTheme('midnight');
		expect(service.theme()).toBe('midnight');
	});

	it('should apply theme attribute to document element', () => {
		service.setTheme('dark');
		TestBed.flushEffects();
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
	});

	it('should update meta theme-color tag', () => {
		service.setTheme('midnight');
		TestBed.flushEffects();
		const meta = document.querySelector('meta[name="theme-color"]');
		expect(meta?.getAttribute('content')).toBe('#000000');
	});

	it('should update localStorage when theme changes', () => {
		service.setTheme('midnight');
		TestBed.flushEffects();
		expect(localStorage.getItem('tracken-theme')).toBe('midnight');
	});
});
