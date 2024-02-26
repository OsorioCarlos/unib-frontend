import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthUser } from '../../interfaces/auth-user';
import { User } from '../../interfaces/user';
import { PrivateAppService } from '../../services/private-app.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
})
export class DirectorComponent {
  formGroupInformacionRepresentante!: FormGroup;
  representante: AuthUser;
  estudiantes: User[] = [];
  evaluacionesPendientes: User[] = [];

  productDialog!: boolean;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[];

  submitted!: boolean;

  constructor(
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.representante = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
    this.buildformGroupSolicitudPracticas();
    this.mostrarBienvenida();
    this.consultarEvaluacionesPendientes();
    this.consultarEvaluacionesPendientes();
  }
  mostrarBienvenida() {
    this.privateAppService.obtener('auth/authUser').subscribe(
      (res) => {
        this.representante = res.data;
      },
      (err) => {}
    );
  }
  private buildformGroupSolicitudPracticas(): void {
    this.formGroupInformacionRepresentante = this.fb.group({
      representante: this.fb.group({
        funcionRepresentante: ['', Validators.required],
        telefono: ['', Validators.required],
      }),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroupInformacionRepresentante.valid) {
      const datos = this.formGroupInformacionRepresentante.value;

      this.privateAppService
        .crear('representante/completarInformacionBasica', datos)
        .subscribe(
          (res) => {
            this.router.navigateByUrl('/app/organization');
          },
          (err) => {
            console.log(err);
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }

  consultarEvaluacionesPendientes(): void {
    this.privateAppService
      .obtener('director/obtenerEvaluacionesPendientes')
      .subscribe(
        (res) => {
          this.estudiantes = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }


  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {

}

editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
}

deleteProduct(product: Product) {

}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.product?.name?.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;                
        }
        else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
}
