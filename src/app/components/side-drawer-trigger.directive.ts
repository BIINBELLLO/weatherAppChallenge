import {
  Directive,
  OnInit,
  Inject,
  ElementRef,
  Input,
  Renderer,
  ViewChild,
} from "@angular/core";
import { JQ_TOKEN } from "../_services/jQuery.service";

@Directive({
  selector: "[drawer-trigger]",
})
export class SideDrawerTriggerDirective {
  private element: HTMLElement;
  @Input("drawer-trigger") elementId: string;
  constructor(el: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.animate();
  }

  scroll() {
    try {
      const targ = document.getElementById("_scroll_");
      targ.scrollIntoView({ behavior: "smooth" });
    } catch {}
  }

  hasScrollBar() {
    if (this.$("body").height() > this.$(window).height()) {
      return true;
    }
    return false;
  }

  animate() {
    const thiss = this;
    this.element.addEventListener("click", (e) => {
      // this.scroll();
      setTimeout(() => {
        thiss.$(`#${thiss.elementId} div:first-child`).removeClass("d-none");
      }, 300);
      setTimeout(() => {
        thiss.$(`#${thiss.elementId} div:first-child`).fadeIn();
      }, 93);
      if (window.matchMedia("(min-width: 992px)").matches) {
        document.querySelector("body").classList.add("side-drawer-on");
      }
      this.$(`#${this.elementId}`).addClass("active");
      this.$(".sideoverlay").addClass("active");
    });
    this.$(".sideoverlay, .close-drawer, .sidebar-wrapper").on("click", (e) => {
      thiss.$(`#${thiss.elementId} div:first-child`).fadeOut();
      setTimeout(() => {
        thiss.$(`#${thiss.elementId}`).removeClass("active");
        thiss.$(".sideoverlay").removeClass("active");
        thiss.$(`#${thiss.elementId}`).on("transitionend", () => {
          if (
            document
              .querySelector(`#${thiss.elementId}`)
              .classList.contains("active")
          ) {
            return;
          }
          document.querySelector("body").classList.remove("side-drawer-on");
        });
      }, 130);
    });
  }
}
