import { Component, OnInit ,NgZone} from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Router,NavigationExtras} from '@angular/router';
@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;

    constructor(private itemService: ItemService,private router: Router,private ngZone: NgZone){
    }
    ngOnInit(): void {
        this.items = this.itemService.getItems();

    }
}
