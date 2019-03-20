import { GeocodeQueryInterface, ReverseQueryInterface, SuggestQueryInterface } from '../../../src/interface';
import { Query } from '../../../src/model';

export const geocodeQueryFixture: Readonly<GeocodeQueryInterface> = Object.freeze<GeocodeQueryInterface>({
    address: '1158 E 89th St',
    countryCode: 'US',
    postalCode: '60619',
    state: 'Illinois',
    stateCode: 'IL',
    city: 'Chicago',
    language: 'en',
    limit: 3,
    fillMissingQueryProperties: true,
    withRaw: true,
});

export const reverseQueryFixture: Readonly<ReverseQueryInterface> = Object.freeze<ReverseQueryInterface>({
    lat: 41.7340186,
    lon: -87.5960762,
    countryCode: 'US',
    limit: 3,
    language: Query.DEFAULT_RESULT_LANGUAGE,
    withRaw: true,
});

export const suggestQueryFixture: Readonly<SuggestQueryInterface> = {
    ...geocodeQueryFixture,
    ...{
        lat: 41.7340186,
        lon: -87.5960762,
        radius: 25000,
    },
};
