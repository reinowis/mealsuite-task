import { Location } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState, TaskActions, UserActions } from "@state";
import { of } from "rxjs";
import { TaskDetailsComponent } from "./task-details.component";

describe("TaskDetailsComponent", () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let store: Store<AppState>;
  let location: Location;
  let formBuilder: FormBuilder;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailsComponent],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => "1" } } },
        },
        FormBuilder,
        Location,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    formBuilder = TestBed.inject(FormBuilder);
    activatedRoute = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);

    component.taskForm = formBuilder.group({
      description: [],
      assigneeId: [],
      completed: [],
    });
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe("ngOnInit", () => {
    it("should call initData() and initForm()", () => {
      const initDataSpy = spyOn(component as any, "initData");
      const initFormSpy = spyOn(component as any, "initForm");

      component.ngOnInit();

      expect(initDataSpy).toHaveBeenCalled();
      expect(initFormSpy).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy", () => {
    it("should complete destroy$ and unsubscribe", () => {
      const nextSpy = spyOn((component as any).destroy$, "next");
      const completeSpy = spyOn((component as any).destroy$, "complete");

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith(null);
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe("initData", () => {
    it("should dispatch TaskActions.GetTaskDetails and UserActions.GetUsers", () => {
      const dispatchSpy = spyOn(store, "dispatch");

      (component as any).initData();

      expect(dispatchSpy).toHaveBeenCalledWith(
        TaskActions.GetTaskDetails({ id: component.taskId })
      );
      expect(dispatchSpy).toHaveBeenCalledWith(UserActions.GetUsers());
    });
  });

  describe("initForm", () => {
    it("should initialize taskForm and subscribe to taskEntities$", () => {
      const groupSpy = spyOn(formBuilder, "group").and.returnValue({
        patchValue: {},
      } as FormGroup);
      spyOn(component.taskEntities$, "pipe").and.returnValue(
        of({
          "1": {
            description: "",
            assigneeId: "",
            completed: "",
          },
        })
      );

      (component as any).initForm();

      expect(groupSpy).toHaveBeenCalled();
    });
  });

  describe("onSubmit", () => {
    it("should dispatch TaskActions.UpdateTask when taskForm is valid", () => {
      const dispatchSpy = spyOn(store, "dispatch");
      const validSpy = spyOnProperty(
        component.taskForm,
        "valid",
        "get"
      ).and.returnValue(true);
      const expectedTask = {
        description: "test",
        assigneeId: "1",
        completed: false,
      };
      component.taskForm.setValue(expectedTask);

      component.onSubmit();

      expect(validSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(
        TaskActions.UpdateTask({ id: component.taskId, task: expectedTask })
      );
    });

    it("should not dispatch TaskActions.UpdateTask when taskForm is invalid", () => {
      const dispatchSpy = spyOn(store, "dispatch");
      const validSpy = spyOnProperty(
        component.taskForm,
        "valid",
        "get"
      ).and.returnValue(false);

      component.onSubmit();

      expect(validSpy).toHaveBeenCalled();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  describe("goBack", () => {
    it("should call location.back", () => {
      const backSpy = spyOn(location, "back");

      component.goBack();

      expect(backSpy).toHaveBeenCalled();
    });
  });
});
