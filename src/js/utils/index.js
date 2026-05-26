export const fix_filter_names = (filter) => {
  if (filter === 'title') return 'Titles';
  if (filter === 'wins') return 'Wins';
  if (filter === 'poles') return 'Poles';
  if (filter === 'podiums') return 'Podiums';
}

export const create_random_color = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const replace_underscore = (text) => {
  return text.replace(/_/g, ' ');
}