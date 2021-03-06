import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {Product} from '../../interface/product';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  deleteId: number;
  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getAll() {
    this.productService.getAll().subscribe(products => {
      console.log('success');
      // @ts-ignore
      this.products = products.content;
    });
  }

  drawConfirmDeleteButton(id: number) {
    this.deleteId = id;
  }

  deleteProduct() {
    this.productService.delete(this.deleteId).subscribe(data => {
      this.getAll();
    });
  }

  logout() {
    return this.authService.logout();
  }


}
