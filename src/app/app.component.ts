import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  {

constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
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
