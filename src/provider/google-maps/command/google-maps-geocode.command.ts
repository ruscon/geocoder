import type { AxiosInstance } from 'axios';
import { GeocodeCommand } from '../../../command';
import type { GeocodeQuery } from '../../../model';
import type { GoogleMapsGeocodeQueryInterface } from '../interface';
import { GoogleMapsLocationCommandMixin } from './mixin';
import { urlSign } from '../../../util/url-signing';

/**
 * @link {https://developers.google.com/maps/documentation/geocoding/intro#GeocodingRequests}
 */
export class GoogleMapsGeocodeCommand extends GoogleMapsLocationCommandMixin(GeocodeCommand)<GoogleMapsGeocodeQueryInterface> {
    constructor(httpClient: AxiosInstance, private readonly apiKey: string, private readonly secret?: string) {
        super(httpClient, apiKey, secret);
    }

    static getUrl(): string {
        return 'https://maps.googleapis.com/maps/api/geocode/json'
    }

    protected async buildQuery(query: GeocodeQuery): Promise<GoogleMapsGeocodeQueryInterface> {
        const components = new Map<string, string>();

        if (query.postalCode) {
            components.set('postal_code', query.postalCode);
        }

        const country = query.countryCode || query.country;
        if (country) {
            components.set('country', country);
        }

        const state: string | undefined = query.stateCode || query.state;
        if (state) {
            components.set('administrative_area', state);
        }

        const providerQuery: GoogleMapsGeocodeQueryInterface = {
            key: this.apiKey,
            address: query.address,
            components: [...components].map<string>(([key, value]) => `${key}:${value}`).join('|'),
            language: query.language,
            limit: query.limit,
            sensor: false,
        };

        if (query.countryCode) {
            providerQuery.region = `.${query.countryCode.toLowerCase()}`;
        }

        if (this.secret) {
            providerQuery.signature = urlSign('/maps/api/geocode/json', providerQuery, this.secret);
        }

        return providerQuery;
    }
}
