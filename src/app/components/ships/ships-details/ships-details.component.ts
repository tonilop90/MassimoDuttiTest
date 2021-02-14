import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IShipsResponse } from 'src/app/interfaces/swapiResponses';
import { ShipsService } from 'src/app/services/ships.service';
import { changePage } from 'src/app/actions/ships.actions';

declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnChanges {

  @Input() dataList: IShipsResponse;
  config: any;
  shipId: string = '';
  url: string = '';
  pageList$: Observable<number>;
  urlBaseImg: string = 'https://starwars-visualguide.com/assets/img/starships/';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor(private shipsService: ShipsService, private store: Store<{ ship: number }>) {
    this.pageList$ = store.select('ship');
  }

  ngOnChanges(){
    this.config = {
      itemsPerPage: 10,
      currentPage: this.pageList$,
      totalItems: this.dataList.count ? this.dataList.count : undefined 
    };
  }

  getStarshipId(url) {
    this.shipId = url.slice(31,-1)
    const fileImg = `${this.shipId}.jpg`
    const urlImage = `${this.urlBaseImg}${fileImg}`;
    return urlImage;
  }

  pageChanged(event){
    const url = `http://swapi.dev/api/starships/?page=${event}`;
    this.shipsService.getPageShips(url).subscribe((ships) => {
      this.dataList.results = ships.results;
    })
    this.config.currentPage = event;
    this.store.dispatch(changePage({page: event}));
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
