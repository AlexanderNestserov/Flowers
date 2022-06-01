import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { AccountService } from '../account/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCf9fC05hA7mkJeR6FkQiIuCcoAMmajefA',
      libraries: ['places'],
    }),
  ],
  exports: [MapComponent],
  providers: [AccountService],
})
export class MapModule {}
