import { Component } from '@angular/core';
import { Menu } from '../../components/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard { }
