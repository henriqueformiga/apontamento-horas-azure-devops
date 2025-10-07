import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-configuracao-canal',
  templateUrl: './configuracao-canal.component.html',
  styleUrls: ['./configuracao-canal.component.css'],
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    NgClass,
    DecimalPipe

  ],
})
export class ConfiguracaoCanalComponent implements OnInit {
  somaHoras: number | null = null;
  horasEsperadas: number | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
    const horasEsperadas = localStorage.getItem('horas-esperadas');
    if (horasEsperadas) this.horasEsperadas = parseInt(horasEsperadas)
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    this.processarCsv(file);
  }

  onFileDrop(event: DragEvent) {
    this.onDrop(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private processarCsv(file: File) {
    Papa.parse(file, {
      header: true,
      complete: (result: any) => {
        const data = result.data as any[];
        const coluna = 'Completed Work';

        if (!data[0] || !(coluna in data[0])) {
          alert(`Coluna "${coluna}" não encontrada no CSV.`);
          this.somaHoras = null;
          return;
        }

        const soma = data.reduce((acc, row) => {
          const valor = parseFloat(
            row[coluna]?.toString().replace(',', '.') || '0'
          );
          return acc + (isNaN(valor) ? 0 : valor);
        }, 0);

        this.somaHoras = soma;
      },
      error: (err: any) => {
        alert(`Erro ao ler CSV: ${err.message}`);
        this.somaHoras = null;
      },
    });
  }
  abrirSeletorArquivo() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.processarCsv(file);

    input.value = '';
  }

  get diferencaHoras(): number {
    return (this.horasEsperadas ?? 0) - (this.somaHoras ?? 0);
  }

  salvarHorasEsperadas(){
    localStorage.setItem('horas-esperadas', (this.horasEsperadas || "").toString());
  }
}
