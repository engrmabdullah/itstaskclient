import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { item } from '../Models/item.model';
import { Step } from '../Models/step.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../Components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  baseUrl = environment.apiUrl;
  itemsList: item[];
  stepsList: Step[];
 formData: item;

 lblbtnName: string = 'Save'
 lblTitle: string = 'Add'
 FristStep: number = 0;
  constructor(public http: HttpClient,private toastr: ToastrService,private modalService: NgbModal) { }



  AddItem() {
    console.log(this.formData);
    return this.http.post(this.baseUrl + "Items/AddItem", this.formData);
  }


  AddStep(dataModel) {
    return this.http.post(this.baseUrl + "Items/AddStep", dataModel);
  }

  GetItems(){
    this.http.get(this.baseUrl + 'Items/GetItems')
    .toPromise()
    .then(res => this.itemsList = res as item[]);
  }

  GetSteps(){
    this.http.get(this.baseUrl + 'Items/GetSteps')
    .toPromise()
    .then(res => this.stepsList = res as Step[]);
  }

  GetFristStep(){
   return this.http.get(this.baseUrl + 'Items/GetFristStep')
  }
  GetLastStep(){
    return this.http.get(this.baseUrl + 'Items/GetLastStep')
   }

  DeleteItem(ItemId) {
    return this.http.get(this.baseUrl + "Items/DeleteItem/"+ ItemId);
  }
  DeleteStep(StepId) {
    return this.http.get(this.baseUrl + "Items/DeleteStep/"+ StepId);
  }

  UpdateItem() {
    console.log(this.formData);
    return this.http.post(this.baseUrl + "Items/UpdateItem/"+ this.formData.id, this.formData);
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showError(message) {
    this.toastr.error(message, 'Error');
  }
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
