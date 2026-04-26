import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TrackenPageHeader, TrackenCard, TrackenInput, TrackenButton } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-security-settings',
	templateUrl: './security.component.html',
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		TrackenPageHeader,
		TrackenCard,
		TrackenInput,
		TrackenButton,
		TranslocoDirective,
	],
})
export class SecuritySettingsComponent {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		currentPassword: [''],
		newPassword: [''],
	});

	loading = signal(false);

	onSave() {
		if (this.form.valid) {
			this.loading.set(true);
			console.log('Saving security...', this.form.value);

			setTimeout(() => {
				this.loading.set(false);
				alert('Senha alterada com sucesso!');
			}, 1000);
		}
	}
}
