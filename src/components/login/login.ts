import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';

import { Router } from '@angular/router';


interface LoginData {
  email: string;
  password: string;
}





@Component({
  selector: 'app-login',
  imports: [CardModule, ButtonModule, FormField, FloatLabelModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);

  constructor(private lordAlert: LordAlertService) { }


  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });


  user = {
    email: 'oscarsy.ing.systems@hotmail.com',
    password: 'Lord070707',
  }


  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email es requerido' });
    email(schemaPath.email, { message: 'Ingresa un email válido' });
    required(schemaPath.password, { message: 'Contraseña es requerida' });

  });

  resetForm() {
    this.loginModel.set({
      email: '',
      password: '',
    });
  }


  onSubmit(event: Event) {
    event.preventDefault();

    const credentials = this.loginModel();

    if (credentials.email == this.user.email && credentials.password == this.user.password) {
      this.lordAlert.showToast('¡Inicio de sesión exitoso!', 'success');
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
      this.resetForm();
    } else {
      this.lordAlert.showModal('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'error');
    }



  }

}
