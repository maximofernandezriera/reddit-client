import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubredditColumnComponent } from './components/subreddit-column.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SubredditColumnComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Signal para almacenar la lista de subreddits activos
  protected subreddits = signal<string[]>([]);

  // Método para mostrar el diálogo de añadir subreddit
  showAddDialog() {
    const subreddit = prompt('Enter the name of a subreddit (without /r/):');
    if (subreddit && subreddit.trim()) {
      const name = subreddit.trim();
      // Verificar que no esté ya agregado
      if (!this.subreddits().includes(name)) {
        this.subreddits.update(current => [...current, name]);
      }
    }
  }

  // Método para cerrar una columna
  removeSubreddit(subreddit: string) {
    this.subreddits.update(current => current.filter(s => s !== subreddit));
  }
}
