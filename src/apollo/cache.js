import { InMemoryCache } from '@apollo/client/cache';

const getMarkerColor = (() => {
  const colors = [
    '#03a8a0',
    '#039c4b',
    '#66d313',
    '#fedf17',
    '#ff0984',
    '#04adff',
    '#e48873',
    '#f16623',
    '#f44546'
  ];
  const markers = {};
  return id => {
    if (!markers[id]) markers[id] = colors.pop();

    return markers[id];
  };
})();

const cache = {
  typePolicies: {
    Robot: {
      fields: {
        markerColor: {
          read(_, { variables: { id } }) {
            return getMarkerColor(id) || 'grey';
          }
        }
      }
    }
  }
};

export default new InMemoryCache(cache);
