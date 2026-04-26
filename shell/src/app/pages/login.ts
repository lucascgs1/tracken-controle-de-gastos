import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@tracken/data-access';
import { TrackenButton, TrackenInput, TrackenCard } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TrackenButton,
		TrackenInput,
		TrackenCard,
		TranslocoDirective,
	],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private authFacade = inject(AuthFacade);

	loginForm = new FormGroup({
		email: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(6)],
		}),
	});

	loading$ = this.authFacade.loading$;
	error$ = this.authFacade.error$;

	onSubmit() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.getRawValue();
			this.authFacade.login(email, password);
		}
	}
}
