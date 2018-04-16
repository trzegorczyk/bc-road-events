import { PipeTransform, Pipe } from "@angular/core";
@Pipe({
    name: 'cleanName'
})
export class NamePipe implements PipeTransform {
    transform(value: string): string {
        let valueArr: string[];
        valueArr = value.split('_');
        valueArr.forEach((value, index, array) => {
            value.toLocaleLowerCase().charAt(0).toUpperCase();
        });
        return valueArr.join(' ');
    }
}