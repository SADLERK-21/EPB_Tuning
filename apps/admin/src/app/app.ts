import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ORDER_STATUS_LABELS } from '@epb/shared';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly statuses = Object.entries(ORDER_STATUS_LABELS);
}
