import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  {

constructor(private matIconRegistry: any, private domSanitizer: DomSanitizer) {
    this.setFlagIcons();
  }

  private setFlagIcons() {
    const listOfIcons: string[] = ['en', 'de', 'fr', 'es'];
    listOfIcons.forEach(icon => {
      this.matIconRegistry.addSvgIcon
      (icon, this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/' + icon + '.svg')
      );
    });
  }
}
