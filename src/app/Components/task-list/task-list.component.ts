import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

}
