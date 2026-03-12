import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../Model/Task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  isEditMode: boolean = false;
  TaskForm: FormGroup = new FormGroup({});
  taskObj: TaskModel = new TaskModel();
  taskList: TaskModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.createForm();

    const oldData = localStorage.getItem("TaskData");
    if(oldData != null) {
      this.taskList = JSON.parse(oldData);
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      const taskId = +idParam; 
      const taskToEdit = this.taskList.find(t => t.Id === taskId);
      if(taskToEdit) {
        this.isEditMode = true;
        this.TaskForm.setValue({
          Id: taskToEdit.Id,
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate,
          createdAt: taskToEdit.createdAt
        });
      }
    }
  }

  createForm() {
    this.TaskForm = new FormGroup({
      Id: new FormControl(this.taskObj.Id || 0),
      title: new FormControl(this.taskObj.title || '', Validators.required),
      description: new FormControl(this.taskObj.description || ''),
      status: new FormControl(this.taskObj.status || '', Validators.required),
      priority: new FormControl(this.taskObj.priority || '', Validators.required),
      dueDate: new FormControl(this.taskObj.dueDate || ''),
      createdAt: new FormControl(this.taskObj.createdAt || new Date())
    });
  }

  onSave() {
    const oldData = localStorage.getItem("TaskData");
    if(oldData != null) {
      this.taskList = JSON.parse(oldData);
    }

    if(this.isEditMode) {
      const index = this.taskList.findIndex(t => t.Id === this.TaskForm.value.Id);
      if(index !== -1) {
        this.taskList[index] = this.TaskForm.value;
      }
      this.isEditMode = false;  
    } else {
      this.TaskForm.controls['createdAt'].setValue(new Date());
      this.taskList.unshift(this.TaskForm.value);
    }
   
    this.taskList.forEach((task, index) => {
      task.Id = index + 1;
    });

    localStorage.setItem("TaskData", JSON.stringify(this.taskList));

    this.TaskForm.reset();
    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}