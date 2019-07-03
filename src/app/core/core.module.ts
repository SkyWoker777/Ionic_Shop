import { NgModule, Optional, SkipSelf } from "@angular/core";
import { LocationStrategy, PathLocationStrategy, } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from './interceptors/httpError.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const coreComponents = [
];


@NgModule({
    declarations: [
        ...coreComponents,
    ],
    providers:
    [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) { }
}