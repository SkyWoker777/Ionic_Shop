import { NgModule } from "@angular/core";
import { CommonModule, } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';

export const sharedComponents = [
];


@NgModule({
    declarations: [
        //components
        ...sharedComponents
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        IonicModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        IonicModule,
        //components
        ...sharedComponents
    ],
    entryComponents: [
        //modals
    ],
})
export class SharedModule {

}