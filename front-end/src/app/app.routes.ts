import { Routes } from '@angular/router';
import { BabyBoardComponent } from './board/board.component';
import { BabyHomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: BabyHomeComponent
    },
    {
        path: 'board',
        component: BabyBoardComponent
    }
];
