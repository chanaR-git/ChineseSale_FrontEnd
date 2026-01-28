
import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { Menu } from './shared/header/menu/menu';


@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet,Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chieneseSaleApp');
}
