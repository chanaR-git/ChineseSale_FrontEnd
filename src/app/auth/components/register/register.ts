import { Component, Inject, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputMask } from 'primeng/inputmask';
import { maxLength } from '@angular/forms/signals';

@Component({
    selector: 'app-register',
    templateUrl: './register.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, MessageModule,PasswordModule,InputMask],
    providers: [MessageService]
})
export class Register {
    messageService = inject(MessageService);

     fb = inject(FormBuilder);

     formSubmitted = false;

    registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(7),Validators.pattern(".*[a-z].*"),Validators.pattern(".*[A-Z].*"),Validators.pattern(".*[0-9].*")]],
        phone:['',Validators.required]
      });

    onSubmit() {
        this.formSubmitted = true;
        if (this.registerForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.registerForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.registerForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}