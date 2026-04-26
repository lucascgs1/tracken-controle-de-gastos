import { TestBed } from '@angular/core/testing';
import { SecuritySettingsComponent } from './security.component';
import { AuthFacade } from '@tracken/data-access';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { WritableSignal, signal } from '@angular/core';
import { provideTrackenTransloco } from '@tracken/shared';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SecuritySettingsComponent', () => {
	let component: SecuritySettingsComponent;
	let authFacadeMock: { loading: WritableSignal<boolean>; updatePassword: Mock };

	beforeEach(async () => {
		authFacadeMock = {
			loading: signal(false),
			updatePassword: vi.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, SecuritySettingsComponent],
			providers: [
				{ provide: AuthFacade, useValue: authFacadeMock },
				provideTrackenTransloco(),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		}).compileComponents();

		const fixture = TestBed.createComponent(SecuritySettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have an invalid form when empty', () => {
		expect(component.form.valid).toBeFalsy();
	});

	it('should validate password mismatch', () => {
		component.form.patchValue({
			currentPassword: 'old',
			newPassword: 'newpassword123',
			confirmPassword: 'different',
		});
		expect(component.form.errors?.['passwordMismatch']).toBeTruthy();
	});

	it('should be valid when passwords match and meet requirements', () => {
		component.form.patchValue({
			currentPassword: 'old',
			newPassword: 'newpassword123',
			confirmPassword: 'newpassword123',
		});
		expect(component.form.valid).toBeTruthy();
	});

	it('should call updatePassword on save if valid', () => {
		component.form.patchValue({
			currentPassword: 'old',
			newPassword: 'newpassword123',
			confirmPassword: 'newpassword123',
		});
		component.onSave();
		expect(authFacadeMock.updatePassword).toHaveBeenCalledWith('newpassword123');
	});

	it('should not call updatePassword on save if invalid', () => {
		component.form.patchValue({
			currentPassword: 'old',
			newPassword: '123', // too short
			confirmPassword: '123',
		});
		component.onSave();
		expect(authFacadeMock.updatePassword).not.toHaveBeenCalled();
	});
});
