import React from 'react';
import '../styles/Recent.css';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

const Recent = ({ setQuery }) => {
  const searchedCities = JSON.parse(localStorage.getItem('cities')) || [];

  return (
    <MDBRow className='recent d-flex justify-content-center w-100 p-4'>
      <MDBCol>
        <h4 className='text-center'>Recent Search</h4>
        <div className='cityList-container'>
          <ul className='cityList'>
            {searchedCities.map((city, index) => (
              <li
                className='cityName mb-2 p-1'
                onClick={() => setQuery({ q: city })}
                key={index}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </MDBCol>
    </MDBRow>
  );
};

export default Recent;
