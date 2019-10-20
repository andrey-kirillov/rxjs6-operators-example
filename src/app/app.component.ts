import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { fromOperator } from './operators/from.operator';
import { ofOperator } from './operators/of.operator';
import { Links } from './constants/sidenav';

import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public editorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
    readOnly: 'nocursor'
  };
  public dataObj = {
    editorContent: '',
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
      .subscribe(res => this.selectOperator(res.url.slice(1)));
  }

  private selectOperator(url) {
    switch (url) {
      case 'of':
        ofOperator(this.dataObj);
        break;
      case 'from':
        fromOperator(this.dataObj);
        break;
      default:
        this.router.navigate(['/of']);
    }
  }
}
