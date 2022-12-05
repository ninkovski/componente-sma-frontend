import { AbstractControl } from '@angular/forms';

export function RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'object') {
        return null
    }else{
        if(selection){
            return { require_match: true };
        }else{
            return null
        }
    }
}