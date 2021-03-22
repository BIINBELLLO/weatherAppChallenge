import { Component, OnInit, Input, Inject } from "@angular/core";
import { JQ_TOKEN } from "src/app/_services/jQuery.service";

@Component({
  selector: "app-side-drawer",
  templateUrl: "./side-drawer.component.html",
  styleUrls: ["./side-drawer.component.scss"],
})
export class SideDrawerComponent implements OnInit {
  @Input() position: string; // left or right
  @Input() elementId: string;
  @Input() headerTitle: string;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  ngOnInit() {
    this.$(`#c_container`).fadeOut();
  }

  closeDrawer() {
    document.body.classList.remove("right-drawer");
  }
}
