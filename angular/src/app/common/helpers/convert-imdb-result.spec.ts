import { MockImdbResult, MockItems } from '../__mocks__';
import { ConverterHelper } from './convert-imdb-result.helper';

describe('Convert Imdb result helper', () => {
  it('should convert imdb result to item model', () => {
    const convertedResult = ConverterHelper.ConvertImdbResult(MockImdbResult);

    expect(convertedResult).toEqual(MockItems);
  });
});
