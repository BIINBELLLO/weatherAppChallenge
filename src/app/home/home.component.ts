import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { LocationSearch, WeatherService } from "../_services/weather.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  weatherDetails: any;
  locationDetails: any;
  viewingCelcius: boolean = true;
  currentIndex = 0;
  searchTerm = "";
  searchResult: Array<LocationSearch> = [];
  loadedAndNoError = false;
  constructor(
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getCurrentUsersLocation();
  }

  changeCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getCurrentUsersLocation() {
    this.spinner.show();
    // this.weatherService.getYourLocation().then((response) => {
    //   this.spinner.hide();
    //   console.log(response);
    // });
    this.weatherService.getCoordinates().then((response) => {
      let latitude = response["coords"].latitude;
      let longitude = response["coords"].longitude;
      this.weatherService.getYourLocation(latitude, longitude).subscribe({
        next: (response) => {
          this.locationDetails = response[0];
          this.getLocationWeatherDetails(this.locationDetails.woeid);
        },
        error: (e) => {
          this.spinner.hide();
          this.toastr.error(
            `Could not determine your current location! Please search!`
          );
        },
      });
    });
  }

  getLocationWeatherDetails(woeid) {
    this.loadedAndNoError = false;
    this.spinner.show();
    this.weatherService.getLocationWeather(woeid).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.weatherDetails = response;
        this.toastr.success(`Weather fetched!`);
        this.loadedAndNoError = true;
        this.cd.detectChanges();
        console.log(this.weatherDetails);
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error(`Something's not right! Please try again!`);
      },
    });
  }

  getRightTemperatureValue(value: number) {
    if (this.viewingCelcius) {
      return value;
    } else {
      return value * (9 / 5) + 32;
    }
  }

  getStyleValue(value: number) {
    return `${value}%`;
  }

  getRotationStyle(value: number) {
    const newVal = Math.floor(value);
    console.log(newVal);
    return { transform: `rotate(${newVal}deg)` };
    // return { transform: `rotate(85deg)` };
  }

  viewTempInCelcius() {
    this.viewingCelcius = true;
  }

  viewTempInFahrenheit() {
    this.viewingCelcius = false;
  }

  getWeatherImage(abbr: string) {
    switch (abbr) {
      case "sn":
        {
          return `../../assets/images/Snow.png`;
        }
        break;
      case "sl":
        {
          return `../../assets/images/Sleet.png`;
        }
        break;

      case "h":
        {
          return `../../assets/images/Hail.png`;
        }
        break;
      case "t":
        {
          return `../../assets/images/Thunderstorm.png`;
        }
        break;
      case "hr":
        {
          return `../../assets/images/HeavyRain.png`;
        }
        break;
      case "lr":
        {
          return `../../assets/images/LightRain.png`;
        }
        break;
      case "s":
        {
          return `../../assets/images/Shower.png`;
        }
        break;
      case "hc":
        {
          return `../../assets/images/HeavyCloud.png`;
        }
        break;
      case "lc":
        {
          return `../../assets/images/LightCloud.png`;
        }
        break;
      case "c":
        {
          return `../../assets/images/Clear.png`;
        }
        break;

      default:
        return `../../assets/images/Clear.png`;
        break;
    }
  }

  searchLocations() {
    if (this.searchTerm === "") {
      this.toastr.error(`Please enter a search term!`);
    } else {
      this.spinner.show();
      this.weatherService.searchLocation(this.searchTerm).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.searchResult = response;
          this.toastr.success(`Search result fetched!`);
          console.log(this.searchResult);
        },
        error: (e) => {
          this.spinner.hide();
          this.toastr.error(`Something's not right! Please try again!`);
        },
      });
    }
  }
}
