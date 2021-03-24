import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { item } from '../../Models/item.model';
import { ItemsService } from '../../services/items.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() currentStep: any = 0;
  @Input() currentIndex: any = 0;
  itemsList: any;

  constructor(public itemsService: ItemsService) {}

  ngOnInit(): void {
    console.log(this.currentStep);
    this.itemsService.GetItems();
  }

  onDeleteItem(id) {


    this.itemsService.confirm('Please confirm..', 'Do you really want to delete this item ?')
    .then((res:any) => {
      if(res === true) {
        this.itemsService.DeleteItem(id).subscribe((arg: any) => {
          this.itemsService.showSuccess('Deleted Successfully');
          this.itemsService.GetItems();
        });
      } else {
        return;
      }
    });
  }

  populateForm(pd: item) {
    this.itemsService.formData = Object.assign({}, pd);
    this.itemsService.lblTitle = 'Edit';
    this.itemsService.lblbtnName = 'Edit';
  }
}
