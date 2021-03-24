import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsService } from '../shared/services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentSelected: number;
  currentindex: number;
  frist: number;
  last: number;
  constructor(public itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.GetSteps();
    this.reset();
  }

  reset() {

    this.itemsService.GetFristStep().subscribe((arg: any) => {
      this.currentSelected = arg.id === undefined ? 0 : arg.id;
      this.frist = arg.id === undefined ? 0 : arg.id;
      if(arg.id != undefined) {
        this.currentindex = 1;
      }
    });
    this.itemsService.GetLastStep().subscribe((arg: any) => {
      this.last = arg.id === undefined ? 0 : arg.id;
    });
  }

  addStep() {
    var obj = {
      stepName: 'Step ' + (this.itemsService.stepsList.length + 1).toString(),
    };

    this.itemsService.AddStep(obj).subscribe((arg: any) => {
      this.itemsService.showSuccess('Add Step Successfully');
      this.itemsService.GetSteps();
      this.reset();
    });
  }



  setStepId(id, i) {
    this.currentSelected = id;
    this.currentindex = i;
  }
  onNext() {
    if (this.currentSelected + 1 > this.last) {
      return;
    }
    this.currentSelected = this.currentSelected + 1;
    this.currentindex = this.currentindex + 1;
  }

  onPrevious() {
    if (this.currentSelected - 1 < this.frist) {
      return;
    }
    this.currentSelected = this.currentSelected - 1;
    this.currentindex = this.currentindex - 1;
  }

  onDeleteStep(id) {

    this.itemsService.confirm('Please confirm..', 'Do you really want to delete this step ?')
    .then((res:any) => {
      if(res === true) {
        this.itemsService.DeleteStep(id).subscribe((arg: any) => {
          this.itemsService.showSuccess('Deleted Successfully');
          this.itemsService.GetSteps();
          this.itemsService.GetItems();
          this.reset();
        });
      } else {
        return;
      }
    });






  }

  resetForm(form?: NgForm) {
    if (form != null) form.form.reset();
    this.itemsService.formData = {
      id: 0,
      title: '',
      description: '',
      stepno: this.currentSelected,
    };

    this.itemsService.lblTitle = 'Add';
    this.itemsService.lblbtnName = 'Save';
  }
}
