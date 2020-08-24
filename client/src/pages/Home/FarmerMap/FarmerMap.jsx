import React from 'react';
import PropTypes from 'prop-types';
import {
  GoogleApiWrapper,
  Map,
  Marker,
  InfoWindow,
} from 'google-maps-react';
import { defaultCoordinates, googleApiKey } from '../../../config';
import styles from './FarmerMap.module.css';

class FarmerMap extends React.Component {
  constructor(props) {
    super(props);
    props.farmers.forEach(farmer => {
      this[`marker${farmer.id}`] = React.createRef();
    });
  }

  render() {
    const {
      google,
      style,
      farmers,
      selectedFarmer,
      selectFarmerCallback,
    } = this.props;

    const activeMarker = selectedFarmer ? this[`marker${selectedFarmer.id}`].current?.marker : null;
    const isInfoWindowOpen = Boolean(selectedFarmer);

    const onMarkerClick = (farmer) => {
      selectFarmerCallback(farmer);
    };

    const onMapClicked = () => {
      selectFarmerCallback(null);
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
              ref={this[`marker${farmer.id}`]}
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
  }
}

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
