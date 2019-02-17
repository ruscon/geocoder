import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { GeocoderException, QuotaExceededException } from '../../../src/exception';

chai.use(chaiAsPromised);
chai.should();

describe('QuotaExceededException (unit)', () => {
    describe('#constructor', () => {
        it('should inherit GeocoderException', async () => {
            new QuotaExceededException('').should.be.instanceOf(GeocoderException);
        });

        it('should inherit Error', async () => {
            return new QuotaExceededException('').should.be.instanceOf(Error);
        });

        it('should return right name', async () => {
            return new QuotaExceededException('').should.have.property('name', QuotaExceededException.name);
        });

        it('should return right message', async () => {
            return new QuotaExceededException('test').should.have.property('message', 'test');
        });
    });
});
