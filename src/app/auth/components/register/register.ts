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
import { AuthService } from '../../services/auth.service';
import { CreateUserModel } from '../../models/CreateUser.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.html',
    styleUrl:'./register.scss',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, MessageModule,PasswordModule,InputMask],
    providers: [MessageService]
})
export class Register {
    messageService = inject(MessageService);
    authService = inject(AuthService)
    router = inject(Router);

     fb = inject(FormBuilder);

     formSubmitted = false;

    registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(7),Validators.pattern(".*[a-z].*"),Validators.pattern(".*[A-Z].*"),Validators.pattern(".*[0-9].*")]],
        phone:['',Validators.required]
      });
      ngOnInit() {
        this.registerForm.reset();
      }

    onSubmit() {
        this.formSubmitted = true;
        if (this.registerForm.valid) 
        {
            const newUser: CreateUserModel = {
            name: this.registerForm.value.name ?? '',
            email: this.registerForm.value.email ?? '',
            password: this.registerForm.value.password ?? '',
            phone: this.registerForm.value.phone ?? ''
            };
            this.authService.register(newUser).subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'הצטרפת בהצלחה!', life: 3000 });
                    this.registerForm.reset();
                    this.formSubmitted = false;
                    this.router.navigate(['login']);
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'הרשמה נכשלה', life: 3000 });
                    console.log(error);
                }
            });
        }
        else
            this.messageService.add({severity: 'error', summary: 'Error', detail:'אופססס, יש שדה שלא עומד בכללים:(', life: 3000 })
        
    }


    isInvalid(controlName: string) {
        const control = this.registerForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}