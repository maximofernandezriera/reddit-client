import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditPost } from '../models/reddit.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-card">
      @if (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default') {
        <img [src]="post.thumbnail" [alt]="post.title" class="thumbnail" />
      }
      
      <div class="post-content">
        <h3 class="post-title">
          <a [href]="'https://reddit.com' + post.permalink" target="_blank" rel="noopener">
            {{ post.title }}
          </a>
        </h3>
        
        <div class="post-meta">
          <span class="author">👤 {{ post.author }}</span>
          <span class="score">⬆️ {{ formatScore(post.score) }}</span>
          <span class="comments">💬 {{ post.num_comments }}</span>
          <span class="time">🕐 {{ formatTime(post.created_utc) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-card {
      background: white;
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      transition: box-shadow 0.2s, transform 0.2s;
      cursor: pointer;
    }

    .post-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .thumbnail {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .post-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .post-title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.4;
    }

    .post-title a {
      color: #1a1a1a;
      text-decoration: none;
      transition: color 0.2s;
    }

    .post-title a:hover {
      color: #667eea;
    }

    .post-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: #657786;
    }

    .post-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .author {
      font-weight: 500;
      color: #5b7083;
    }

    .score {
      color: #ff4500;
      font-weight: 600;
    }

    .comments {
      color: #1da1f2;
    }

    .time {
      color: #657786;
    }
  `]
})
export class PostCardComponent {
  @Input({ required: true }) post!: RedditPost;

  formatScore(score: number): string {
    if (score >= 1000) {
      return (score / 1000).toFixed(1) + 'k';
    }
    return score.toString();
  }

  formatTime(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    
    if (days > 0) return days + 'd';
    if (hours > 0) return hours + 'h';
    if (minutes > 0) return minutes + 'm';
    return 'now';
  }
}
