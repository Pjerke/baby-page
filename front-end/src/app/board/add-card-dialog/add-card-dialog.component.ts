import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BoardCardCreate, Owner, ResetInterval } from '../../../models/board-card.interface';

@Component({
  templateUrl: './add-card-dialog.component.html',
  providers: [],
  imports: [Field, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogContent]
})
export class BabyAddCardDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<BabyAddCardDialogComponent>);
  private cardModel = signal<BoardCardCreate>({
    resetInterval: null,
    owner: Owner.Jacob,
    title: '',
    description: ''
  });
  public cardForm = form(this.cardModel, (schemaPath) => {
    required(schemaPath.owner),
    required(schemaPath.title)
  });
  public readonly ownerEnum = Owner;
  public readonly resetIntervalEnum = ResetInterval;

  public onSubmit(): void {
    const cardCreate = this.cardModel();
    if (this.cardForm().invalid())
      return;

    this.dialogRef.close(cardCreate);
  }
}
