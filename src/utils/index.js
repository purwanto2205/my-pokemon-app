export const handleColor = (type) => {
  if (type === 'Grass') {
    return '#8cc34a';
  } else if (type === 'Poison') {
    return '#aa22b0';
  } else if (type === 'Flying') {
    return '#cd9cf7';
  } else if (type === 'Water') {
    return '#2cc3fe';
  } else if (type === 'Bug') {
    return '#9eb540';
  } else {
    return '#f5c542';
  }
};
