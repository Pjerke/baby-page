import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardCard, Owner, ResetInterval, Status } from '../../models/board-card.interface';
import { ApiService } from '../../services/api.service';
import { BabyAddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';

@Component({
  selector: 'baby-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [],
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, DragDropModule],
})
export class BabyBoardComponent implements OnInit {
  public readonly statusEnum = Status;
  public readonly ownerEnum = Owner;
  public readonly resetIntervalEnum = ResetInterval;
  public readonly statuses = Object.values(Status).filter((value) => typeof value !== 'string');
  public boardCards = signal<BoardCard[]>([]);
  public boardCardsByStatus = computed(() => [
    this.boardCards().filter((card) => card.status === Status.OnHold),
    this.boardCards().filter((card) => card.status === Status.ToDo),
    this.boardCards().filter((card) => card.status === Status.Doing),
    this.boardCards().filter((card) => card.status === Status.Done),
    this.boardCards().filter((card) => card.status === Status.Archived)
  ]);

  private readonly dialog = inject(MatDialog);
  private readonly snackBarService = inject(MatSnackBar);
  private readonly apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getAllBoardCards().subscribe((cards) => this.boardCards.set(cards));
  }

  public onDrop(event: CdkDragDrop<BoardCard[]>, newStatus: Status): void {
    console.log(event)
    console.log(newStatus)
    
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      movedCard.status = newStatus;

      console.log(movedCard)

      this.apiService.updateBoardCard(movedCard).subscribe({
        error: () => this.snackBarService.open('Failed to update card', undefined, { duration: 3000 })
      });
    }

    this.boardCards.set(this.statuses.flatMap((_, i) => this.boardCardsByStatus()[i]));
  }

  public onAddCard(): void {
    this.dialog.open(BabyAddCardDialogComponent, { width: '50%' }).afterClosed().subscribe((result) => {
      if (!result)
        return;

      this.apiService.addBoardCard(result).subscribe({
        next: (newCard) => {
          this.snackBarService.open('Success', undefined, { duration: 3000, verticalPosition: 'top' });
          this.boardCards.update((cards) => [...cards, newCard]);
        },
        error: () => this.snackBarService.open('Error', undefined, { duration: 3000, verticalPosition: 'top' })
      });
    });
  }
}
