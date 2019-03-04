import Axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { InvalidCredentialsException, InvalidServerResponseException, QuotaExceededException, UnsupportedAccuracyException } from '../../../src/exception';
import { Geocoder } from '../../../src/geocoder';
import { GeocodeQueryInterface, ReverseQueryInterface } from '../../../src/interface';
import { AccuracyEnum } from '../../../src/model';
import { MapQuestProvider } from '../../../src/provider';
import { plainFullFilledGeocodeQueryObject, plainFullFilledReverseQueryObject } from '../../fixture/model/query.fixture';
import { plainFullFilledResponseObject, plainParsedResponseObject } from '../../fixture/provider/map-quest.fixture';

chai.use(chaiAsPromised);
chai.should();

describe('MapQuestProvider (2e2)', () => {
    let geocodeQueryFixture: GeocodeQueryInterface;
    let reverseQueryFixture: ReverseQueryInterface;
    let geocoder: Geocoder;
    let provider: MapQuestProvider;
    let mock: MockAdapter;

    beforeEach(() => {
        geocodeQueryFixture = { ...plainFullFilledGeocodeQueryObject };
        reverseQueryFixture = { ...plainFullFilledReverseQueryObject };

        const client: AxiosInstance = Axios.create();
        mock = new MockAdapter(client);

        provider = new MapQuestProvider(client, 'test');

        geocoder = new Geocoder(provider);
    });

    describe('#geocode', () => {
        it('should return success response', async () => {
            mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

            return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
        });

        it('should throw InvalidServerResponseException on empty response', async () => {
            mock.onGet(provider.geocodeUrl).reply(200, '');

            return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(InvalidServerResponseException, /Invalid server response/);
        });

        it('should return empty results on response with empty json', async () => {
            mock.onGet(provider.geocodeUrl).reply(200, {});

            return geocoder.geocode(geocodeQueryFixture).should.become([]);
        });

        it('should return empty results on response with empty results array', async () => {
            mock.onGet(provider.geocodeUrl).reply(200, {
                results: [],
            });

            return geocoder.geocode(geocodeQueryFixture).should.become([]);
        });

        it('should return empty results on response with empty results[0].locations array', async () => {
            mock.onGet(provider.geocodeUrl).reply(200, {
                results: [
                    {
                        locations: [],
                    },
                ],
            });

            return geocoder.geocode(geocodeQueryFixture).should.become([]);
        });

        it('should throw InvalidCredentialsException', async () => {
            mock.onGet(provider.geocodeUrl).reply(401);

            return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(InvalidCredentialsException, 'API key is invalid');
        });

        it('should throw InvalidCredentialsException', async () => {
            mock.onGet(provider.geocodeUrl).reply(403);

            return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(InvalidCredentialsException, 'API key is invalid');
        });

        it('should throw QuotaExceededException', async () => {
            mock.onGet(provider.geocodeUrl).reply(429);

            return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(QuotaExceededException, 'Quota exceeded');
        });

        it('should throw InvalidServerResponseException', async () => {
            mock.onGet(provider.geocodeUrl).reply(500);

            return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(InvalidServerResponseException);
        });

        it('should throw UnsupportedAccuracyException (does not support AccuracyEnum.HOUSE_NUMBER)', async () => {
            geocodeQueryFixture.accuracy = AccuracyEnum.HOUSE_NUMBER;

            return geocoder
                .geocode(geocodeQueryFixture)
                .should.be.rejectedWith(
                    UnsupportedAccuracyException,
                    `provider MapQuestProvider doesn't support "houseNumber" accuracy (max accuracy is "streetName")`,
                );
        });
    });

    describe('#reverse', () => {
        it('should return success response', async () => {
            mock.onGet(provider.reverseUrl).reply(200, plainFullFilledResponseObject);

            return geocoder.reverse(reverseQueryFixture).should.become(plainParsedResponseObject);
        });

        it('should throw InvalidServerResponseException on empty response', async () => {
            mock.onGet(provider.reverseUrl).reply(200, '');

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidServerResponseException, /Invalid server response/);
        });

        it('should return empty results on response with empty json', async () => {
            mock.onGet(provider.reverseUrl).reply(200, {});

            return geocoder.reverse(reverseQueryFixture).should.become([]);
        });

        it('should return empty results on response with empty results array', async () => {
            mock.onGet(provider.reverseUrl).reply(200, {
                results: [],
            });

            return geocoder.reverse(reverseQueryFixture).should.become([]);
        });

        it('should return empty results on response with empty results[0].locations array', async () => {
            mock.onGet(provider.reverseUrl).reply(200, {
                results: [
                    {
                        locations: [],
                    },
                ],
            });

            return geocoder.reverse(reverseQueryFixture).should.become([]);
        });

        it('should throw InvalidCredentialsException', async () => {
            mock.onGet(provider.reverseUrl).reply(401);

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidCredentialsException, 'API key is invalid');
        });

        it('should throw InvalidCredentialsException', async () => {
            mock.onGet(provider.reverseUrl).reply(403);

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidCredentialsException, 'API key is invalid');
        });

        it('should throw QuotaExceededException', async () => {
            mock.onGet(provider.reverseUrl).reply(429);

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(QuotaExceededException, 'Quota exceeded');
        });

        it('should throw InvalidServerResponseException', async () => {
            mock.onGet(provider.reverseUrl).reply(500);

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidServerResponseException);
        });

        it('should throw UnsupportedAccuracyException (does not support AccuracyEnum.HOUSE_NUMBER)', async () => {
            reverseQueryFixture.accuracy = AccuracyEnum.HOUSE_NUMBER;

            return geocoder
                .reverse(reverseQueryFixture)
                .should.be.rejectedWith(
                    UnsupportedAccuracyException,
                    `provider MapQuestProvider doesn't support "houseNumber" accuracy (max accuracy is "streetName")`,
                );
        });
    });
});
