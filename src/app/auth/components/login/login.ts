import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/Login.model';

@Component({
    selector: 'app-login',
    imports:[ReactiveFormsModule, ButtonModule,CommonModule, ToastModule,MessageModule,PasswordModule,InputText],
    templateUrl: './login.html', 
    styleUrl: './login.scss',  
    providers: [MessageService]
})
export class Login {
    messageService = inject(MessageService);
    authservice = inject(AuthService);

    fb = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.pattern(".*[a-z].*"),Validators.pattern(".*[A-Z].*"),Validators.pattern(".*[0-9].*")]]
    });

    formSubmitted = false;

    onSubmit() {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            const loginData: LoginModel = this.loginForm.value;
            this.authservice.login(loginData).subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });
                    this.loginForm.reset();
                    this.formSubmitted = false;
                    console.log(response.token);
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'Login failed', life: 3000 });
                    console.log(error);
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields correctly.', life: 3000 });
        }
    }

    isInvalid(controlName: string) {
        const control = this.loginForm.get(controlName);
        return control?.invalid && (control?.touched || this.formSubmitted);
    }
}
