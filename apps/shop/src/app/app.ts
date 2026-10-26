import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { formatPrice } from '@epb/shared';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly samplePrice = formatPrice(35000);
}
