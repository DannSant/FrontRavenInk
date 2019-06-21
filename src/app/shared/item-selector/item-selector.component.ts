import { MdbTablePaginationComponent, MdbTableDirective } from "angular-bootstrap-md";

import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'item-selector',
  templateUrl: './item-selector.component.html',
  styles: []
})
export class ItemSelectorComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective

  @Input('elements') listElements:any[];

  @Output() addItemEvent:EventEmitter<any>;

  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Nombre', 'Desc', 'Estatus'];

  constructor(private cdRef: ChangeDetectorRef) {
    this.addItemEvent = new EventEmitter();
   }

  ngOnInit() {
    // for (let i = 1; i <= 15; i++) {
    //   this.elements.push({id: i.toString(), first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i});
    // }

    this.elements=this.listElements;

    

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addItem(id){
    this.addItemEvent.emit({id});
  }
}