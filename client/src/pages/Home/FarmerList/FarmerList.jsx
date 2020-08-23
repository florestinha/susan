import React from 'react';
import PropTypes from 'prop-types';
import styles from './FarmerList.module.scss';

const FarmerList = ({
  farmers,
  selectedFarmer,
  selectFarmerCallback,
}) => (
  <div className={`${styles.container}`}>
    {farmers.map(farmer => {
      const isSelectedRow = farmer.id === selectedFarmer?.id;
      return (
        <div
          key={farmer.id}
          className={`${styles.listRow} ${isSelectedRow ? styles.selectedRow : ''}`}
          onClick={() => selectFarmerCallback(farmer)}
        >
          {farmer.name}
        </div>
      );
    })}
  </div>
);

FarmerList.propTypes = {
  farmers: PropTypes.array.isRequired,
  selectedFarmer: PropTypes.object,
  selectFarmerCallback: PropTypes.func,
};

FarmerList.defaultProps = {
  selectedFarmer: undefined,
  selectFarmerCallback: () => null,
};

export default FarmerList;
