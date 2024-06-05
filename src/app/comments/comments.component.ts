import { Component, HostListener, inject } from '@angular/core';
import { CommentsService } from '../comments.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../comment';
import { MatCardModule  } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})

export class CommentsComponent {
  comments: Comment[] = [];
  commentService: CommentsService = inject(CommentsService);
  isLoading = false;

  constructor() {}

  ngOnInit() {
    this.loadMoreComments();
  }

  loadMoreComments() {
    this.isLoading = true;
    setTimeout(() => {
      this.commentService.getComments().subscribe((comments: Comment[]) => {
        this.comments = [...this.comments, ...comments];
        this.isLoading = false;
      });
    }, 2000);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max) {
      this.loadMoreComments();
    }
  }

}
