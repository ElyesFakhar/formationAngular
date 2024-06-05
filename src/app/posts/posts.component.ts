import { Component, HostListener, inject } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatProgressSpinnerModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: Post[] = [];
  postService: PostsService = inject(PostsService);
  isLoading = false;

  ngOnInit() {
    this.loadMorePosts();
  }

  loadMorePosts() {
    this.isLoading = true;
    setTimeout(() => {
      this.postService.getPosts().subscribe((posts: Post[]) => {
        this.posts = [...this.posts, ...posts];
        this.isLoading = false;
      });
    }, 2000);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max) {
      this.loadMorePosts();
    }
  }

}
