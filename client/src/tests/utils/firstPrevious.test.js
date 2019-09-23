import firstPrevious from '../../utils/firstPrevious';

it('should return a letter between a and z', () => {
  const letter = firstPrevious();
  expect(typeof letter).toBe('string');
  expect(letter.match(/[a-z]/)).toBeTruthy();
  expect(letter.length).toBe(1);
});
