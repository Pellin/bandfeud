import theFix from '../../utils/theFix';

it('should return "t" for previous 1 if band name starts with "the" and a letter', () => {
  const response = theFix('the clash', { previous1: 'c', previous2: '' });
  expect(response).toEqual({previous1: 't', previous2: ''});
});

it('should return "t" for previous if band name starts with "the" and a number', () => {
  const response = theFix('the 2', { previous1: 'c', previous2: '2' });
  expect(response).toEqual({previous1: 't', previous2: 't'});
});

it('should return previous if argument does not start with "the"', () => {
  const previous = { previous1: 's', previous2: ''};
  const response = theFix('sex pistols', previous);
  expect(response).toEqual(previous);
});
