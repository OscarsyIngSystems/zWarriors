import { Component, inject, OnInit, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { GetData } from '../../services/get-data';

import { CommonModule, SlicePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { DialogModule } from 'primeng/dialog';
import { form, FormField, required } from '@angular/forms/signals';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { LordAlertService } from '../../components/lord-alert/service/lord-alert.service';



interface Details {
  nombre: string,
  raza: string,
  maxKi: string,
  genero: string
}



@Component({
  selector: 'app-dashboard',
  imports: [Menu, TableModule, TagModule, ProgressBarModule, ButtonModule, DialogModule, FormField, FloatLabelModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private getData = inject(GetData);
  private lordAlert = inject(LordAlertService);

  detailsModel = signal<Details>({
    nombre: '',
    raza: '',
    maxKi: '',
    genero: ''

  });



  warriors = signal<any[]>([]);
  cols = signal<any[]>([
    { field: 'image', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'race', header: 'Race' },
    { field: 'maxKi', header: 'Max Ki' },
    { field: 'gender', header: 'Gender' },
    { field: 'actions', header: 'Actions' }
  ]);


  visible: boolean = false;

  detailsForm = form(this.detailsModel, (schemaPath) => {
    required(schemaPath.nombre, { message: 'Nombre es requerido' });
    required(schemaPath.raza, { message: 'Raza es requerida' });
    required(schemaPath.maxKi, { message: 'Max Ki es requerido' });
    required(schemaPath.genero, { message: 'Género es requerido' });
  });



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

  showDialog(rowData: any) {
    this.visible = true;
    this.detailsModel.set({
      nombre: rowData.name,
      raza: rowData.race,
      maxKi: rowData.maxKi,
      genero: rowData.gender
    });
  }

  closeDialog() {
    this.lordAlert.showToast('Cambios guardados exitosamente', 'success');
    this.visible = false;

  }
}
