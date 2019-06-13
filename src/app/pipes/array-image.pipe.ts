import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayImage'
})
export class ArrayImagePipe implements PipeTransform {

  transform(imagesString: string, args?: any): string[] {

    let images: string[] = [' "no-image.jpg"'];
    try {
      images = imagesString.split(";");
    } catch {
      images = [' "no-image.jpg"'];
    }



    return images;
  }

}
