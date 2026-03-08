import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '../components/menu/menu';
import { Login } from '../components/login/login';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('z-warriors');



}
