import { Component, inject, OnInit, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { GetData } from '../../services/get-data';

import { SlicePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [Menu, TableModule, TagModule, ProgressBarModule, SlicePipe, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private getData = inject(GetData);

  warriors = signal<any[]>([]);
  cols = signal<any[]>([
    { field: 'image', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'race', header: 'Race' },
    { field: 'maxKi', header: 'Max Ki' },
    { field: 'gender', header: 'Gender' },
    { field: 'actions', header: 'Actions' }
  ]);

  ngOnInit(): void {
    this.getData.getAllItems().subscribe({
      next: (response: any) => {
        this.warriors.set(response.items);
        console.log('Datos recibidos en el componente:', this.warriors);
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });




  }


  getSeverity(status: string) {
    switch (status) {
      case 'Saiyan':
        return 'success';
      case 'Human':
        return 'info';
      case 'Namekian':
        return 'warn';
      case 'Frieza Race':
        return 'danger';
      case 'Android':
        return 'secondary';
      case 'Angel':
        return 'contrast';
      case 'Majin':
        return 'success';
      case 'God':
        return 'info';
      default:
        return null;
    }
  }


  extractNumericValue(kiString: string): number {
    if (!kiString) return 0;


    const match = kiString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}
