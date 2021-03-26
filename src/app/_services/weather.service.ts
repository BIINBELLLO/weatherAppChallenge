import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  async getCurrentLocation() {
    let lat = 0;
    let lng = 0;
    const position = await this.getCoordinates();
  }

  getYourLocation(latitude, longitude) {
    return this.http.get<Array<any>>(
      `${environment.apiUrl}/search/?lattlong=${latitude},${longitude}`
    );
  }

  searchLocation(searchTerm: string) {
    return this.http.get<Array<LocationSearch>>(
      `${environment.apiUrl}/search/?query=${searchTerm}`
    );
  }

  getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getLocationWeather(id) {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }
}

export interface LocationSearch {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}
