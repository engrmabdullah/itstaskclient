import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './Components/items/items.component';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FilteritemsPipe } from './pipes/filteritems.pipe';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [ItemsComponent,AddItemComponent, FilteritemsPipe, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ArchwizardModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [ItemsComponent,AddItemComponent,NgbModule, FormsModule,ArchwizardModule,FilteritemsPipe,ToastrModule]
})
export class SharedModule { }
