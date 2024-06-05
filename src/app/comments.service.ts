import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: Comment[] = [];
  private chunkSize = 10;

  readonly baseUrl = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getComments(): Observable<Comment[]> {
    if (this.comments.length === 0) {
      return this.http.get<Comment[]>(this.baseUrl + 'comments')
        .pipe(
          tap((comments) => {
            if (comments) {
              this.comments = comments;
            }
          }),
          switchMap(() => this.getNextComments())
        );
    } else {
      return this.getNextComments();
    }
  }

  private getNextComments(): Observable<Comment[]> {
    const nextComments = this.comments.slice(0, this.chunkSize);
    this.comments = this.comments.slice(this.chunkSize);
    return of(nextComments);
  }
}