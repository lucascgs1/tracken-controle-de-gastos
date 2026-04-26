import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	ReactiveFormsModule,
	NonNullableFormBuilder,
	Validators,
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import {
	TrackenPageHeader,
	TrackenCard,
	TrackenInput,
	TrackenButton,
	TrackenAnimateDirective,
} from '@tracken/shared';
import { AuthFacade } from '@tracken/data-access';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-security-settings',
	templateUrl: './security.component.html',
	styleUrl: './security.component.scss',
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		TrackenPageHeader,
		TrackenCard,
		TrackenInput,
		TrackenButton,
		TrackenAnimateDirective,
		TranslocoDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuritySettingsComponent {
	private fb = inject(NonNullableFormBuilder);
	private authFacade = inject(AuthFacade);

	// Formulário fortemente tipado e não-nulo
	form = this.fb.group(
		{
			currentPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required]],
		},
		{ validators: this.passwordMatchValidator },
	);

	// Uso direto do Signal da Facade
	loading = this.authFacade.loading;

	private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
		const newPassword = control.get('newPassword')?.value;
		const confirmPassword = control.get('confirmPassword')?.value;

		return newPassword === confirmPassword ? null : { passwordMismatch: true };
	}

	onSave() {
		if (this.form.valid) {
			const { newPassword } = this.form.getRawValue();
			this.authFacade.updatePassword(newPassword);
		}
	}
}
