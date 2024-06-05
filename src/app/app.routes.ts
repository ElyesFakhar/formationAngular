import { Routes } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: 'comments', component: CommentsComponent },
    { path: '**', redirectTo: '/posts', pathMatch: 'full' }
];
