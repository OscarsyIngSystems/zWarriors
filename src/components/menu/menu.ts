import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports: [ButtonModule, MenubarModule, ToggleSwitchModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  private router = inject(Router);


  items: MenuItem[] | undefined;
  checked = signal<boolean>(false);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard'

      },
      {
        label: 'Personajes',
        icon: 'pi pi-id-card',
        routerLink: '/personajes'
      },
      {
        label: 'Estadísticas',
        icon: 'pi pi-chart-line',
        routerLink: '/estadisticas'

      },

    ];
  }




  onThemeChange(event: boolean) {
    this.checked.set(event);


    this.toggleDarkMode();
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  onSingOut() {
    this.router.navigate(['/']);
    sessionStorage.removeItem('isLoggedIn');
    console.log('Cerrando sesión...');
  }
}
