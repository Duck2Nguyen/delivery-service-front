import { LongLatData } from "@Components/MapFollowShipper";
import axios from "axios";

const getUrl = (location: string) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZHVjazJuZ3V5ZW4iLCJhIjoiY2x3cnRhOHdjMDRrczJsc2RheDk2NHIydiJ9.uHBims-_jNjMB5FgGrC-wA`;
};

const getUrlReverseGeocoding = (geocoding: LongLatData) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${geocoding.longtitude},${geocoding.latitude}.json?access_token=pk.eyJ1IjoiZHVjazJuZ3V5ZW4iLCJhIjoiY2x3cnRhOHdjMDRrczJsc2RheDk2NHIydiJ9.uHBims-_jNjMB5FgGrC-wA`;
};

const getDirectionUrl = (
  fromLocation: LongLatData,
  toLocation: LongLatData
) => {
  return `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${fromLocation.longtitude},${fromLocation.latitude};${toLocation.longtitude},${toLocation.latitude}?geometries=geojson&access_token=pk.eyJ1IjoiZHVjazJuZ3V5ZW4iLCJhIjoiY2x3cnRhOHdjMDRrczJsc2RheDk2NHIydiJ9.uHBims-_jNjMB5FgGrC-wA`;
};

class MapService {
  async getCoordinate(location: string) {
    //location : 222 Phố Lò Đúc , Phường Đống Mác , Quận Hai Bà Trưng , Thành phố Hà Nội
    // tôi muốn đổi thành 222 P. Lò Đúc, Đống Mác, Hai Bà Trưng, Hà Nội
    let tmp=location.replace("Phố","P.");
    tmp=tmp.replace("Phường","");
    tmp=tmp.replace("Quận","");
    tmp=tmp.replace("Thành phố","");


    const url = getUrl(tmp);
    const resp = (await axios.get(url)).data;

    return resp.features.at(0).geometry.coordinates;
  }

  async getLocation(geocoding: LongLatData) {
    const url = getUrlReverseGeocoding(geocoding);
    console.log("url", url);
    const resp = (await axios.get(url)).data;

    console.log("resp", resp);
    return resp.features[0]?.place_name;
  }

  async getDirection(fromLocation: LongLatData, toLocation: LongLatData) {
    const url = getDirectionUrl(fromLocation, toLocation);
    const resp = (await axios.get(url)).data;
    return resp.routes[0];
  }
}

export default new MapService();
