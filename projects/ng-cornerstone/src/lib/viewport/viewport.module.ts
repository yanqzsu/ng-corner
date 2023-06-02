import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ViewportComponent } from './viewport.component';
import { CornerstoneInitService } from '../core';
import { ToolModule } from '../tool';

@NgModule({
  declarations: [ViewportComponent],
  imports: [ToolModule],
  exports: [ViewportComponent],
})
export class ViewportModule {
  constructor(
    @Optional() initService: CornerstoneInitService,
    @SkipSelf() @Optional() parent?: ViewportModule,
  ) {
    if (parent) {
      throw new Error('ToolBarModule should be imported only once!');
    }
    if (initService) {
      initService.init();
      console.log('CS init');
    }
  }
}
