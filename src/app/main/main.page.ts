import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DictionaryState } from '../lib/dictionary/dictionary.state';
import { DictionaryService } from '../lib/dictionary/dictionary.service';
import { DictionaryTestService } from '../lib/dictionary/dictionary.test.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  choice1 = '';
  choice2 = '';
  constructor(
    public dictionaryState: DictionaryState,
    private dictionaryService: DictionaryService,
    private dictionaryTestService: DictionaryTestService
  ) { }

  ngOnInit() {
  }

  mergeDictionaries() {
    if (this.choice1 === this.choice2) {
      return alert('Why you are merging the same dictionary?');
    }

    alert(`Merged and created a new dictionary ${this.dictionaryService.mergeDictionary(this.choice1, this.choice2)}`);
  }

  newDictionary() {
    alert(`Created Dictionary ${this.dictionaryService.createDictionary()}`);
  }

  clearDictionary() {
    this.dictionaryService.init();
  }

  runTest1() {
    this.dictionaryTestService.test1();
  }
  runTest2() {
    this.dictionaryTestService.test2();
  }
  runTest3() {
    this.dictionaryTestService.test3();
  }
}
