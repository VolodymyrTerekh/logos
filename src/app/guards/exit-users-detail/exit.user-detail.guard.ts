import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
 
export interface ComponentCanDeactivate{
    canDeactivate: () => boolean;
}
 
@Injectable({
    providedIn: 'root'
})
export class ExitUserDetailGuard implements CanDeactivate<ComponentCanDeactivate>{
 
    canDeactivate(component: ComponentCanDeactivate): boolean{
         
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}