import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TaskQuery } from "@shared/models";
import { SharedModule } from "@shared/shared.module";
import { TaskActions, UserActions } from "@state";
import { TaskListComponent } from "./task-list.component";

describe("TaskListComponent", () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [SharedModule, ReactiveFormsModule],
      providers: [
        provideMockStore({}),
        { provide: FormBuilder, useClass: MockFormBuilder },
        { provide: NgForm, useClass: MockNgForm },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    const formBuilder = new FormBuilder();

    component.taskForm = formBuilder.group({
      description: [""],
      assigneeId: [""],
    });

    component.queryForm = formBuilder.group({
      description: [""],
      assigneeId: [[]],
      completed: [],
    });

    component.taskFormDirective = new NgForm([], []);
  });
  
  describe("initData", () => {
    it("should call GetUsers method", () => {
      spyOn(store, "dispatch");

      (component as any).initData();

      expect(store.dispatch).toHaveBeenCalledWith(UserActions.GetUsers());
    });

    it("should call getTasksList method", () => {
      spyOn(component as any, "getTasksList");

      (component as any).initData();

      expect((component as any).getTasksList).toHaveBeenCalled();
    });
  });

  describe("initForm", () => {
    it("should initialize taskForm object", () => {
      expect(component.taskForm.value).toEqual({
        description: "",
        assigneeId: "",
      });
    });

    it("should initialize queryForm object", () => {
      expect(component.queryForm.value).toEqual({
        description: "",
        completed: null,
        assigneeId: [],
      });
    });

    it("should call getTasksList method on queryForm value change", () => {
      spyOn(component as any, "getTasksList");

      (component as any).initForm();

      (component as any).queryForm.patchValue({
        description: "Test Description",
      });

      expect((component as any).getTasksList).toHaveBeenCalled();
    });
  });

  describe("getTasksList", () => {
    it("should dispatch the GetTasks action with query param", () => {
      const query: TaskQuery = {
        description: "Test Description",
        completed: true,
        assigneeId: ['123'],
      };

      spyOn(store, "dispatch");

      (component as any).getTasksList(query);

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskActions.GetTasks({ query })
      );
    });

    it("should dispatch the GetTasks action without query param", () => {
      spyOn(store, "dispatch");

      (component as any).getTasksList();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskActions.GetTasks({ query: undefined })
      );
    });
  });

  describe("completeTask", () => {
    it("should dispatch the CompleteTask action with id and completed param", () => {
      const mockEvent: MatCheckboxChange = {
        checked: true,
      } as MatCheckboxChange;

      spyOn(store, "dispatch");

      component.completeTask(mockEvent, '123');

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskActions.CompleteTask({ id: '123', completed: true })
      );
    });
  });

  describe("onSubmit", () => {
    it("should dispatch the AddTask action with task param", () => {
      spyOn(store, "dispatch");

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskActions.AddTask({ task: component.taskForm.value })
      );
    });

    it("should reset the taskFormDirective", () => {
      spyOn(component.taskFormDirective, "resetForm");

      component.onSubmit();

      expect(component.taskFormDirective.resetForm).toHaveBeenCalled();
    });
  });

  describe("resetFilter", () => {
    it("should call reset method of queryForm", () => {
      spyOn(component.queryForm, "reset");

      component.resetFilter();

      expect(component.queryForm.reset).toHaveBeenCalled();
    });
  });
});

class MockFormBuilder {
  group(config: any): FormGroup {
    return new FormGroup({});
  }
}

class MockNgForm {
  resetForm() {}
}
