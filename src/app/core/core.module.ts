import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BackendService } from "./services";

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [BackendService],
})
export class CoreModule {}
