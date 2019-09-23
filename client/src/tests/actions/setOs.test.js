import setOs from '../../actions/setOs';

let osString;

beforeEach(() => {
  osString =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36';
});

it('should set OS to "desktop"', () => {
  const reply = setOs(osString);

  expect(reply).toEqual({
    type: 'SET_OS',
    payload: 'desktop'
  });
});
