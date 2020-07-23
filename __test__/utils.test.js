const {serialize, generateIntials} = require('../src/utils/index')

test('Serialize Object Query to String', () => {
    expect(serialize({title: 'Aladdin'})).toBe('title=Aladdin');
});

test('Serialize Mutiple Object Query to String', () => {
    expect(serialize({title: 'Aladdin', limit: "64"})).toBe('title=Aladdin&limit=64');
});

test('Generate Initial of "Farrizal Alchudry Mutaqien"', () => {
    expect(generateIntials("Farrizal Alchudry Mutaqien")).toBe("FM");
});

test('Generate Initial of "Riez"', () => {
    expect(generateIntials("Riez")).toBe("RI");
});