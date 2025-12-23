import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'baby-nav-menu',
  templateUrl: './nav-menu.component.html',
  imports: [MatButtonModule, MatIconModule]
})
export class BabyNavMenuComponent {
  private readonly router = inject(Router);

  public navigateToHome(): void {
    this.router.navigate(['/'])
  }

  public navigateToBoard(): void {
    this.router.navigate(['/board'])
  }
}
