import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() currentStep : number;
  FormModel: FormGroup;
  submitted = false;
  isLoading: boolean = false;

  constructor( private formBuilder: FormBuilder , public itemsService: ItemsService) {
   }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.itemsService.formData = {
      id: 0,
      title: '',
      description: '',
      stepno: this.currentStep,
    }
  }


  onSubmit() {

    if(this.itemsService.formData.stepno === 0) {
      this.itemsService.showError('Please Select Step');
      return;
    }

    if(this.itemsService.formData.id != 0){
      this.itemsService.formData['stepno'] = this.currentStep;
      this.itemsService.UpdateItem().subscribe((arg: any) => {
        this.itemsService.showSuccess('Update Item Successfully');
        this.itemsService.GetItems();
      });
    } else {
      this.itemsService.formData['stepno'] = this.currentStep;
      this.itemsService.AddItem().subscribe((arg: any) => {
        this.itemsService.showSuccess('Add Item Successfully');
        this.itemsService.GetItems();
      });
    }

  }

}
