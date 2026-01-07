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

@Component({
    selector: 'app-login',
    imports:[ReactiveFormsModule, ButtonModule,CommonModule, ToastModule,MessageModule,PasswordModule,InputText],
    templateUrl: './login.html', 
    styleUrl: './login.scss',  
    providers: [MessageService]
})
export class Login {
    messageService = inject(MessageService);

    fb = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    formSubmitted = false;

    onSubmit() {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });
            this.loginForm.reset();
            this.formSubmitted = false;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields correctly.', life: 3000 });
        }
    }

    isInvalid(controlName: string) {
        const control = this.loginForm.get(controlName);
        return control?.invalid && (control?.touched || this.formSubmitted);
    }
}
