import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "@core";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRoutingModule } from "./task-routing.module";

@NgModule({
  declarations: [TaskListComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TaskRoutingModule,
  ],
})
export class TaskModule {}
