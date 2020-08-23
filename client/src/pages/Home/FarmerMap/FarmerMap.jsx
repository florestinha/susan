import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleApiWrapper,
  Map,
  Marker,
  InfoWindow,
} from 'google-maps-react';
import { defaultCoordinates, googleApiKey } from '../../../config';
import styles from './FarmerMap.module.css';

const FarmerMap = ({
  google,
  style,
  farmers,
  selectedFarmer,
  selectFarmerCallback,
}) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});

  const onMarkerClick = (farmer, marker) => {
    selectFarmerCallback(farmer);
    setActiveMarker(marker);
    setIsInfoWindowOpen(true);
  };

  const onMapClicked = () => {
    if (isInfoWindowOpen) {
      setIsInfoWindowOpen(false);
      // setActiveMarker({});
      // setSelectedPlace({});
    }
  };

  return (
    <div
      style={{
        ...style,
      }}
    >
      <Map
        onClick={onMapClicked}
        google={google}
        zoom={11}
        initialCenter={defaultCoordinates}
        containerStyle={{
          position: 'relative',
          minWidth: '300px',
          minHeight: '300px',
        }}
      >
        {farmers.map(farmer => farmer.latitude && (
          <Marker
            // eslint-disable-next-line no-shadow
            onClick={({ farmer }, marker) => onMarkerClick(farmer, marker)}
            key={farmer.id}
            // ref={farmer.id}
            farmer={farmer}
            title={farmer.name}
            position={{
              lat: farmer.latitude,
              lng: farmer.longitude,
            }}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={isInfoWindowOpen}
        >
          <div className={styles.infoWindow}>
            <h4>{selectedFarmer?.name}</h4>
            {selectedFarmer?.description}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

FarmerMap.propTypes = {
  google: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  farmers: PropTypes.array.isRequired,
  selectedFarmer: PropTypes.object,
  selectFarmerCallback: PropTypes.func.isRequired,
};

FarmerMap.defaultProps = {
  selectedFarmer: undefined,
};

export default GoogleApiWrapper({
  apiKey: googleApiKey,
})(FarmerMap);
