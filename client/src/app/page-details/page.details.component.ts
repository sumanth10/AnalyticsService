import { Component, OnInit } from "@angular/core";
import { PageService } from "../services/page.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: "app-page-list",
  templateUrl: "./page-details.component.html",
  styleUrls: ['./page.details.component.css']
})
export class PageDetailsComponent implements OnInit {
  PageName: any = [];
  PageActivityCount: any = [];
  PageActivityRate: any = [];
  PageCountry: any = [];


  /** Variable for graph starts here ******/
  graphCountryData: any = [];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Users';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /** Variable for graph ends here ******/

  ngOnInit() { }

  constructor(
    public pageService: PageService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get("id");
    this.loadPageActiveUsers(id);
    this.loadPageDetails(id);
    this.loadPageReturningUserRate(id);
    this.loadPageCountries(id);
  }


  loadPageActiveUsers(id) {
    return this.pageService.GetPageActiveUsers(id).subscribe((data: {}) => {
      this.PageActivityCount = data["viewcount"];
    });
  }

  loadPageDetails(id) {
    return this.pageService.GetPageDetails(id).subscribe((data: {}) => {
      if (data["pages"].length > 0) {
        this.PageName = data["pages"][0].pageName;
      }


    });
  }

  loadPageReturningUserRate(id) {
    return this.pageService.GetReturningUserRate(id).subscribe((data: {}) => {
      this.PageActivityRate = data["rate"]
    });
  }

  loadPageCountries(id) {
    return this.pageService.GetCountries(id).subscribe((data: {}) => {

      this.PageCountry = data;
      this.PageCountry.forEach(element => this.graphCountryData.push({ name: element._id, value: element.value }));
      this.graphCountryData = [...this.graphCountryData];
    });
  }
  onSelect(event) {
    console.log(event);
  }

}
