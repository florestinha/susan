import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PRODUCER_QUERY from './PRODUCER_QUERY';

const ProducerDetailsPage = () => {
  const { producerId } = useParams();
  const { loading, error, data } = useQuery(PRODUCER_QUERY, {
    variables: { id: producerId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { producer } = data;
  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title'>{producer.name}</h1>
        <h2 className='subtitle'>
          {producer.description}
        </h2>
        <div>{`Descrição: ${producer.description}`}</div>
        <div>{`Localização: ${producer.latitude}, ${producer.longitude}`}</div>
      </div>
    </section>
  );
};

export default ProducerDetailsPage;
