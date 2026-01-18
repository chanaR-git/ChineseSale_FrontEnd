import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [Menubar],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
    private authService = inject(AuthService);
    private loggedIn = false;
    private role = this.authService.getUserRole();
    private router = inject(Router);
    
    items: MenuItem[] = [];

    private setItems(){      
      this.items  = [
      {
          label:this.loggedIn ? 'התנתקות' : 'התחברות',
          icon: this.loggedIn ? 'pi pi-user-minus' : 'pi pi-user-plus',
          command: () => {
            if (this.loggedIn) 
            {
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
          icon: 'pi pi-gift'
      }
    ]



  if(this.loggedIn && this.authService.isAdmin()){
    this.items.push(
      {
        label: 'ניהול',
        icon: 'pi pi-slack',
        items: [
            {
                label: 'מתנות',
                icon: 'pi pi-gift'
            },
            {
                label: 'תורמים',
                icon: 'pi pi-building-columns',
                command:()=>{
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
