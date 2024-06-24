export interface GoogleMapsQueryInterface {
    sensor?: boolean;
    key: string;
    /**
     * Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier. Optional.
     * https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes
     */
    region?: string;
    language: string;
    /**
     * Signature for signed request to Google Maps API to bypass the 25k requests/day limit
     * https://developers.google.com/maps/documentation/maps-static/digital-signature#server-side-signing
     */
    signature?: string;
}
