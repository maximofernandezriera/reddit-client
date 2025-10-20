import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { RedditResponse, RedditPost } from '../models/reddit.model';

@Injectable({
  providedIn: 'root'
})
export class RedditService {
  // Usamos /api que será redirigido por el proxy a reddit.com
  private readonly REDDIT_API = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los posts de un subreddit específico
   * @param subreddit Nombre del subreddit (sin /r/)
   * @returns Observable con el array de posts
   */
  getSubredditPosts(subreddit: string): Observable<RedditPost[]> {
    // Usamos el proxy local para evitar problemas de CORS
    const url = `${this.REDDIT_API}/r/${subreddit}.json?limit=25&raw_json=1`;
    
    return this.http.get<RedditResponse>(url).pipe(
      map(response => {
        // Extraemos los posts del formato de Reddit
        return response.data.children.map(child => child.data);
      }),
      catchError(error => {
        console.error(`Error fetching r/${subreddit}:`, error);
        return of([]); // Retornamos un array vacío en caso de error
      })
    );
  }

  /**
   * Valida si un subreddit existe
   * @param subreddit Nombre del subreddit
   * @returns Observable con boolean indicando si existe
   */
  validateSubreddit(subreddit: string): Observable<boolean> {
    const url = `${this.REDDIT_API}/r/${subreddit}/about.json`;
    
    return this.http.get(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
