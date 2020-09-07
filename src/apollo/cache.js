import { InMemoryCache, makeVar } from '@apollo/client/cache';

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
    if (!id) return null;

    if (!markers[id]) markers[id] = colors.pop();

    return markers[id];
  };
})();

const tablesEditingStatus = makeVar(false);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tablesEditingStatus: {
          read() {
            return tablesEditingStatus();
          }
        }
      }
    },
    Robot: {
      fields: {
        markerColor: {
          read: (_, options) => {
            return getMarkerColor(options.variables.id) || 'grey';
          }
        }
      }
    }
  }
});

export { cache, tablesEditingStatus };
