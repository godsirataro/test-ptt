import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() description: string = '';

  showModal = false;

  constructor(
  ) {}

  ngOnInit(): void {}

}
