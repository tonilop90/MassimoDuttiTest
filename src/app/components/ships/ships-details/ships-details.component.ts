import { Component, Input, OnChanges } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnChanges {

  @Input() dataList: any;
  config: any;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor(private shipsService: ShipsService) { 
  }

  ngOnChanges(){
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.dataList.count ? this.dataList.count : undefined 
    };
  }

  getStarshipId(url) {
    this.shipId = url.slice(0, -1)
    const urlImage = `${this.shipId}.jpg`
    return urlImage !== "";
  }

  pageChanged(event){
    const url = `http://swapi.dev/api/starships/?page=${event}`;
    this.shipsService.getPageShips(url).subscribe((ships) => {
      this.dataList.results = ships.results;
    })
    this.config.currentPage = event;

  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
