import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
})
export class PageListComponent implements OnInit {

  PageList: any = [];
  PageListDisp: any = [];


  ngOnInit() {
    this.loadPages();
  }

  constructor(
    public pageService: PageService
  ){ }

   // Pages list
   loadPages() {
    return this.pageService.GetPageList().subscribe((data: {}) => {

      this.PageList = data;
      this.PageList.forEach(element => this.PageListDisp.push({id:element._id,name:element.pageName[0]}))
    })
  }


}