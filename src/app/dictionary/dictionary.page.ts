import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionaryState } from '../lib/dictionary/dictionary.state';
import { DictionaryService } from '../lib/dictionary/dictionary.service';
import { DictionaryModel } from '../lib/dictionary/dictionary.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {
  public key: string;
  public dictionary: DictionaryModel;
  public inputValue = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    public dictionaryState: DictionaryState,
    private dictionaryService: DictionaryService,
    private router: Router
  ) { }


  ngOnInit() {
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    this.dictionary = this.dictionaryService.loadDictionary(this.key);
    if (!this.dictionary) {
      this.router.navigateByUrl('/main');
    }
    console.log(this.dictionary);
  }

  add(value: string) {
    this.dictionary.add(value);
  }

}
