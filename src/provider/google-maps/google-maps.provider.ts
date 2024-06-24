import type { AxiosInstance } from 'axios';
import { AbstractHttpProvider } from '../../model';
import {
    GoogleMapsDistanceCommand,
    GoogleMapsGeocodeCommand,
    GoogleMapsPlaceDetailsCommand,
    GoogleMapsReverseCommand,
    GoogleMapsSuggestCommand,
} from './command';

export class GoogleMapsProvider extends AbstractHttpProvider {
    constructor(httpClient: AxiosInstance, apiKey: string, secret?: string) {
        super({
            geocode: new GoogleMapsGeocodeCommand(httpClient, apiKey, secret),
            reverse: new GoogleMapsReverseCommand(httpClient, apiKey, secret),
            suggest: new GoogleMapsSuggestCommand(httpClient, apiKey),
            placeDetails: new GoogleMapsPlaceDetailsCommand(httpClient, apiKey),
            distance: new GoogleMapsDistanceCommand(httpClient, apiKey),
        });
    }
}
