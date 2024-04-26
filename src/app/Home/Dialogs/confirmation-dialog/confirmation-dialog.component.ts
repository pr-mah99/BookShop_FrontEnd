import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<any, any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
    }
  ) {}

  onConfirm(): void {
    // Close the dialog and return true to indicate confirmation
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog and return false to indicate cancellation
    this.dialogRef.close(false);
  }
}
