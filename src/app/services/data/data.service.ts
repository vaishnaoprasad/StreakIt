import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _tasks = new BehaviorSubject([]);

  constructor() { }

  get getTasks(){
    return this._tasks.asObservable();
  }

  createNewTask(data: any){
    const task = new Task(data.id, data.title, data.description, data.deadline, data.status);
    this._tasks.next(this._tasks.value.concat(task));
    return task;
  }

}
