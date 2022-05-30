import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxPvTvkvXjsq5hJg-V6r7lHXo6RV2EudM',
    }),
  ],
  exports: [MapComponent],
})
export class MapModule {}
