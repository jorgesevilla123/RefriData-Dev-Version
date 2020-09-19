import { Component, OnInit } from '@angular/core';
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../products";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";



@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  searchKey: string
  products: Products[]
  allProducts: number


  constructor(
    public inventoryService: InventoryService,
    public alert: AlertService,
     public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    const dialogRef = this.dialog.open(InventoryManageProductsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      product => {
        if (product) {
          this.alert.notifySuccess(`Se añadio ${product.data.title} a los productos`, 2500, 'top', 'center')
          setTimeout( () => {
            location.reload()
          }, 2000)
        }
        else {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
      }

    )




   

  }

  onSearchClear() {
    this.searchKey = '';
  }

  getProducts(): void {
    this.inventoryService.getProducts()
    .subscribe(products => {
      this.products = products.slice(0, products.length/(products.length/40)),
    this.allProducts = products.length});

  }

}
