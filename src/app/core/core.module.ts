import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material";
import { BackendService } from "./services";

@NgModule({
  declarations: [],
  imports: [HttpClientModule, MaterialModule],
  exports: [MaterialModule],
  providers: [BackendService],
})
export class CoreModule {}
