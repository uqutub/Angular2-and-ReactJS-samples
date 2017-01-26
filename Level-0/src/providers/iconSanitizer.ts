import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MdIconRegistry } from '@angular/material';

@Injectable()
export class DomSanitizationService {

    constructor(private sanitizer: DomSanitizer, private mdIconRegistry: MdIconRegistry) { }
    // since material 2 beta.0 and onward releases only allows trusted svg urls, we have to sanitize our svg icon using Angular 2 Dom sanitizer service
    sanitize(svgIconName: string, svgIconPath: string) {
        this.mdIconRegistry.addSvgIcon(svgIconName, this.sanitizer.bypassSecurityTrustResourceUrl(svgIconPath));
    }

}

