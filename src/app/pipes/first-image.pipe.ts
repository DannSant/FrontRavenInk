import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstImage'
})
export class FirstImagePipe implements PipeTransform {

  transform(imagesString: string, args?: any): string {

    let firstImage: string = "no-image.jpg";
    try {
      let images: string[] = imagesString.split(";");
      firstImage = images[0];
    } catch {
      firstImage = "no-image.jpg";
    }



    return firstImage;
  }

}
