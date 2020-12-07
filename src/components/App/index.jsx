import React from 'react';
import { useQuery } from '@apollo/client';

import AppHeader from '../AppHeader';
import AuthPage from '../AuthPage';
import RoomsPage from '../RoomsPage';
import MapPage from '../MapPage';

import { GET_APP_STATUS } from './requests';

import './index.css';

const App = () => {
  const { data, loading, error } = useQuery(GET_APP_STATUS);

  if (loading || error) return null;

  const { operatorId, roomId } = data;
  return (
    <div className="map-application">
      <AppHeader stylization="map-aplication-header" />
      <div className="map-application-content">
        <div className="content-container">
          {!operatorId && <AuthPage />}
          {operatorId && !roomId && <RoomsPage />}
          {operatorId && roomId && <MapPage />}
        </div>
      </div>
    </div>
  );
};

export default App;
