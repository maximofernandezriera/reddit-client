import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditService } from '../services/reddit.service';
import { RedditPost } from '../models/reddit.model';
import { PostCardComponent } from './post-card.component';

@Component({
  selector: 'app-subreddit-column',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  template: `
    <div class="column">
      <div class="column-header">
        <h2>r/{{ subreddit }}</h2>
        <button class="close-btn" (click)="onClose()" title="Close column">✕</button>
      </div>
      
      <div class="column-content">
        @if (loading()) {
          <div class="loading">Loading posts...</div>
        } @else if (error()) {
          <div class="error">
            <p>❌ Error loading r/{{ subreddit }}</p>
            <button (click)="loadPosts()">Retry</button>
          </div>
        } @else if (posts().length === 0) {
          <div class="empty">No posts found</div>
        } @else {
          @for (post of posts(); track post.id) {
            <app-post-card [post]="post"></app-post-card>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .column {
      display: flex;
      flex-direction: column;
      width: 350px;
      min-width: 350px;
      max-width: 350px;
      height: 100%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .column-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .column-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }

    .loading, .error, .empty {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }

    .error {
      color: #e74c3c;
    }

    .error button {
      margin-top: 12px;
      padding: 8px 16px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .error button:hover {
      background: #c0392b;
    }
  `]
})
export class SubredditColumnComponent implements OnInit {
  @Input({ required: true }) subreddit!: string;
  @Output() close = new EventEmitter<void>();

  protected posts = signal<RedditPost[]>([]);
  protected loading = signal(true);
  protected error = signal(false);

  constructor(private redditService: RedditService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.error.set(false);

    this.redditService.getSubredditPosts(this.subreddit).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
