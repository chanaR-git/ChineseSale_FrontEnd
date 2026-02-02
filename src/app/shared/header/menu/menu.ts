import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { Basket } from "../../../basket/components/basket/basket";

@Component({
  selector: 'app-menu',
  imports: [MenubarModule, DrawerModule, CommonModule, Basket],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true
})

export class Menu implements OnInit {
  private authService = inject(AuthService);
  private loggedIn = false;
  private role = this.authService.getUserRole();
  private router = inject(Router);
  private showBasket = false;
  @ViewChild('basketRef')
  private basketRef?: Basket;

  openBasket() {
    this.basketRef?.loadBasket();
  }

  visible: boolean = false;
  items: MenuItem[] = [];

  private setItems() {
    this.items = [
      {
        label: this.loggedIn ? 'התנתקות' : 'התחברות',
        icon: this.loggedIn ? 'pi pi-user-minus' : 'pi pi-user-plus',
        command: () => {
          if (this.loggedIn) {
            this.authService.logout();
          }
          this.router.navigate(['login']);
        },
      },
      {
        label: 'בית',
        icon: 'pi pi-home'
      },
      {
        label: 'כל המתנות',
        icon: 'pi pi-gift',
        command: () => {
          this.router.navigate(['gifts'])
        }
      }
    ]


    if (this.loggedIn) {
      console.log(this.role);
      
      if (this.role === 'User') {
        this.items.push(
          {
            label: 'הסל שלי',
            icon: 'pi pi-shopping-cart',
            command: () => {
              this.visible = true;
            }
          });}

      if (this.authService.isAdmin()) {
        this.items.push(
          {
            label: 'ניהול',
            icon: 'pi pi-slack',
            items: [
              {
                label: 'מתנות',
                icon: 'pi pi-gift',
                command: () => {
                  this.router.navigate(['management/gifts'])
                }
              },
              {
                label: 'תורמים',
                icon: 'pi pi-building-columns',
                command: () => {
                  this.router.navigate(['management/donors'])
                }
              },
              {
                label: 'רכישות',
                icon: 'pi pi-wallet'
              },
              {
                label: 'הגרלה',
                icon: 'pi pi-sparkles'
              }
            ]
          });
      }
    }
  }
  ngOnInit() {

    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;


      this.authService.role$.subscribe((role) => {
        this.role = role;
        this.setItems();
      });

      this.setItems();
    })
  }
}
