import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent  implements OnInit{

  CheckoutFormGroup : FormGroup | undefined;

  constructor( private formbuilder:FormBuilder){

  }

  ngOnInit(): void {
    this.getCheckoutFormGroud();
  }
  getCheckoutFormGroud() {
    this.CheckoutFormGroup = this.formbuilder.group({
      
    })
  }


}
