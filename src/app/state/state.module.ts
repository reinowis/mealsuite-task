import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootEffects, rootReducers } from './root';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffects)
  ],
  providers: []
})
export class StateModule { }
