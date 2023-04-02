import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { Task, TaskQuery, User } from "../../shared/models";

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  storedTasks: Task[] = [
    {
      id: '0',
      description: "Install a monitor arm",
      assigneeId: '111',
      completed: false
    },
    {
      id: '1',
      description: "Move the desk to the new location",
      assigneeId: '111',
      completed: false
    }
  ];

  storedUsers: User[] = [
    { id: '111', name: "Mike" },
    { id: '222', name: "James" }
  ];

  private findTaskById = (id: any) =>
    this.storedTasks.find(task => task.id === id);

  private findUserById = (id: any) => this.storedUsers.find(user => user.id === id);

  tasks(query?: TaskQuery) {
    return of(this.storedTasks.filter(
      (task) =>
        task.description.toLowerCase().includes(query?.description.toLowerCase() || "") &&
        (query?.assigneeId ? query.assigneeId?.includes(task.assigneeId) : true) &&
        (query?.completed ? task.completed === query.completed : true)
    )).pipe(delay(randomDelay()));
  }

  task(id: string): Observable<Task | undefined> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: string) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTask(payload: Pick<Task, 'description' | 'assigneeId'>) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      description: payload.description,
      assigneeId: payload.assigneeId,
      completed: false
    };

    this.storedTasks = this.storedTasks.concat(newTask);

    return of(newTask).pipe(delay(randomDelay()));
  }

  assign(taskId: string, userId: string) {
    return this.update(taskId, { assigneeId: userId });
  }

  complete(taskId: string, completed: boolean) {
    return this.update(taskId, { completed });
  }

  update(taskId: string, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map(t =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask).pipe(delay(randomDelay()));
  }
}
