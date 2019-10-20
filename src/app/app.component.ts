import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import RxJsOperators from './operators/all.operators';
import { Links } from './constants/sidenav';

import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


interface DataObj {
  source: Subscription;
  res: any[];
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public editorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
    readOnly: 'nocursor'
  };
  public dataObj: DataObj = {
    source: null,
    res: [],
    text: ''
  };
  public operatorLinks = Links;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        tap(() => this.dataObj.res = [])
      )
      .subscribe(res => res.url === '/' ? this.router.navigate(['/of']) : this.selectOperator(res.url.slice(1)));
  }

  private selectOperator(url) {
    this.customUnsubscribe();
    RxJsOperators[(url + 'Operator')](this.dataObj);
  }

  private customUnsubscribe() {
    if (this.dataObj.source instanceof Subscription) {
      this.dataObj.source.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.customUnsubscribe();
  }
}

