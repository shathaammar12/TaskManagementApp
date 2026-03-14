import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { TaskModel } from '../../Model/Task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../Services/TaskService';

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

export class TaskListComponent {
  taskList: TaskModel[] = [];
  searchTitle: string = '';
  selectedStatus: string = '';
  selectedPriority: string = '';

  constructor(
    private router: Router,
    private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskList = this.taskService.getAllTasks();
  }

  onEdit(task: TaskModel) {
    this.router.navigate(['/tasks/edit', task.Id]);
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this task?");
    if(isDelete) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  onView(task: TaskModel) {
    this.router.navigate(['/tasks', task.Id]);
  }

  get filteredTasks() {
    return this.taskList.filter(task => {
      const matchesTitle = task.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesStatus = !this.selectedStatus || task.status == this.selectedStatus;
      const matchesPriority = !this.selectedPriority || task.priority == this.selectedPriority;

      return matchesTitle && matchesStatus && matchesPriority;
    });
  }
}
