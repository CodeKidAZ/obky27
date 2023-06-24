import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';
import { HeroJobAdComponent } from './hero-job-ad.component';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `,
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = []; // parent calls a service to populate this array of objects, child uses array.

  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
    this.loadComponent(); // grab random ad from ads
    // this.getAds(); // run loadcomponent every 3 secs.
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex]; // get ad from array

    console.log('hello', this.adHost);
    const viewContainerRef = this.adHost.viewContainerRef; // get container ref
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(
      HeroJobAdComponent
    );
    // create component using container ref

    // insert data
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    const interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
    this.clearTimer = () => clearInterval(interval);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
