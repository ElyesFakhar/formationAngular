import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private chunkSize = 10;
  readonly baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    if (this.posts.length === 0) {
      return this.http.get<Post[]>(this.baseUrl + 'posts')
        .pipe(
          tap((posts) => {
            if (posts) {
              this.posts = posts;
            }
          }),
          switchMap(() => this.getNextPosts())
        );
    } else {
      return this.getNextPosts();
    }
  }

  private getNextPosts(): Observable<Post[]> {
    const nextPosts = this.posts.slice(0, this.chunkSize);
    this.posts = this.posts.slice(this.chunkSize);
    return of(nextPosts);
  }

}
