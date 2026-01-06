
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Register,Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chieneseSaleApp');
}
