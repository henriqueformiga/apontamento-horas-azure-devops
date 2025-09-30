import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>
      {{ data.ativo ? 'Desativar canal?' : 'Ativar canal?' }}
    </h2>
    <mat-dialog-content>
      Tem certeza que deseja {{ data.ativo ? 'desativar' : 'ativar' }} o canal
      com: <br /><strong>Remetente:</strong> {{ data.remetente }}<br />
      <strong>Canal ID:</strong> {{ data.canalId }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-button color="primary" (click)="dialogRef.close(true)">
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
