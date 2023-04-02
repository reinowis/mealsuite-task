import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", component: TaskListComponent },
  { path: ":id", component: TaskDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
