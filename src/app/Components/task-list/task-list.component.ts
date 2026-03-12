import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { TaskModel } from '../../Model/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent implements OnInit {
  taskList: TaskModel[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const data = localStorage.getItem("TaskData");
    if (data) {
      this.taskList = JSON.parse(data);
    }
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  onEdit(item: TaskModel) {
  this.router.navigate(['/tasks/edit', item.Id]);
}

  onDelete(item: TaskModel) {
  const isDelete = confirm(`Are you sure you want to delete "${item.title}"?`);
  if(isDelete) {
    const index = this.taskList.findIndex(m => m.Id === item.Id);
    if(index !== -1) this.taskList.splice(index, 1);

    this.taskList.forEach((task, i) => task.Id = i + 1);

    localStorage.setItem("TaskData", JSON.stringify(this.taskList));
  }
}
}
