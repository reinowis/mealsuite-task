import { NgModule } from '@angular/core';
import { MaterialModule } from './material';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
  ],
  exports: [ MaterialModule ],
})
export class SharedModule { }
