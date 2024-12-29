import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../store/app.state';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {
  user: User = { id: 0, name: '' }; // Default user object

  constructor(@Inject(MAT_DIALOG_DATA) public data: { mode: string; user?: User },
    public dialogRef: MatDialogRef<UserDialogComponent>) {}

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.user) {
      this.user = { ...this.data.user };
      console.log('User in edit mode:', this.user);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.user);
  }
}
