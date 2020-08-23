import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import FarmerMap from './FarmerMap/FarmerMap';
import FarmerInfo from './FarmerInfo/FarmerInfo';
import FarmerList from './FarmerList/FarmerList';
import ErrorHandler from '../../components/ErrorAndLoading/ErrorHandler';
import FARMERS_QUERY from './FARMERS_QUERY';

import '../PageStyles.css';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [selectedFarmer, setSelectedFarmer] = useState();

  const history = useHistory();

  const queryResult = useQuery(FARMERS_QUERY);

  if (queryResult.loading) return <div>Loading...</div>;
  if (queryResult.error) return <ErrorHandler error={queryResult.error} />;
  const { entities } = queryResult.data;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mapTitle}>
        Mapa de Produtores Agroecológicos
      </div>
      <div className={styles.mapAndInfo}>
        <FarmerList
          farmers={entities}
          selectedFarmer={selectedFarmer}
          selectFarmerCallback={setSelectedFarmer}
        />
        <FarmerMap
          style={{
            width: '500px',
            height: '500px',
          }}
          farmers={entities}
          selectedFarmer={selectedFarmer}
          selectFarmerCallback={setSelectedFarmer}
        />
        <FarmerInfo farmer={selectedFarmer} />
      </div>
      <button
        type='button'
        style={{ margin: '30px' }}
        onClick={() => history.push('entity-create')}
      >
        Criar nova entidade
      </button>
    </div>
  );
};


HomePage.propTypes = {};

export default HomePage;
