import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BabyNavMenuComponent } from "./nav-menu/nav-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, BabyNavMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
