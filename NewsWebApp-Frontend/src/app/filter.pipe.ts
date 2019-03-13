import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
// export class Filter implements PipeTransform {
//   transform(value: string, chracter: string): string {
//     return value.replace(chracter, " ");
//   }
// }
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === "") {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
