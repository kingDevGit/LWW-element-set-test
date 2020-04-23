import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { DictionaryService } from './lib/dictionary/dictionary.service';
import { DictionaryState } from './lib/dictionary/dictionary.state';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private dictionaryService: DictionaryService,
    public dictionaryState: DictionaryState
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.dictionaryService.init();
    });
  }

  ngOnInit() {
  }

  selectDictionary(key: string, i: number) {
    this.selectedIndex = i;
  }
}
