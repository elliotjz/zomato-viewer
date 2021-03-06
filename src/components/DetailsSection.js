import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'react-image';

import Tick from './Tick';
import Cross from './Cross';
import OpenIndicator from './OpenIndicator';
import Spinner from './Spinner';

import { getOpeningHours, isOpenNow } from '../utils';

const Container = styled.div`
  flex: 7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 3rem;

  .image-container {
    img {
      object-fit: cover;
      height: 30vw;
      width: 30vw;
    }
  }

  h1 {
    font-size: 1.5em;
    font-weight: 500;
  }

  h6 {
    font-size: 0.9em;
    color: ${(props) => props.theme.colors.darkGrey};
  }

  .booking-delivery-container {
    margin: 1em 0;
    font-size: 0.8em;

    div {
      display: flex;
      align-items: center;
      margin: 0.5em 0;

      svg {
        margin-right: 1em;
      }
    }
  }

  label {
    font-weight: 600;
    font-size: 0.7em;
    letter-spacing: 0.2em;
  }

  .large-p {
    margin-bottom: 1em;
    font-size: 1.1em;
  }
`;

const DetailsSection = ({ restaurant, loading }) => {
  let rest;
  let photoUrl;
  let address;
  let openingHours;
  let openNow;
  let openNowError = false;
  if (restaurant && restaurant.restaurant) {
    rest = restaurant.restaurant;
    photoUrl = rest.photos ? rest.photos[0].photo.url : '';

    const streetNumber = rest.location.address.split(' ')[0];
    address = streetNumber + rest.location.locality_verbose;

    const { timings } = rest;
    const date = new Date();
    openingHours = getOpeningHours(timings, date);
    try {
      openNow = isOpenNow(openingHours, date);
    } catch (err) {
      openNowError = true;
    }
  } else {
    rest = null;
  }

  return (
    <Container>
      {rest ? (
        <>
          <div className="image-container">
            <Img
              src={photoUrl}
              alt={`${rest.name}`}
              loader={<Spinner />}
            />
          </div>
          <div>
            <h1>{rest.name}</h1>
            <h6>{address}</h6>
            <div className="booking-delivery-container">
              {rest.has_table_booking >= 0
                ? (
                  <div>
                    <Tick height="1.5em" width="1.5em" /><p>Booking available</p>
                  </div>
                )
                : (
                  <div>
                    <Cross height="1.5em" width="1.5em" /><p>No bookings</p>
                  </div>
                )}
              {rest.R.has_menu_status.delivery >= 0
                ? (
                  <div>
                    <Tick height="1.5em" width="1.5em" /><p>Delivery available</p>
                  </div>
                )
                : (
                  <div>
                    <Cross height="1.5em" width="1.5em" /><p>No delivery</p>
                  </div>
                )}
            </div>
            <label>CUISINES</label>
            <p className="large-p">{rest.cuisines}</p>
            <label>PHONE NUMBER</label>
            <p className="large-p">{rest.phone_numbers}</p>
            <label>OPENING HOURS</label>
            <p className="large-p">
              Today {openingHours}
              {' '}
              {!openNowError && <OpenIndicator open={openNow} />}
            </p>
          </div>
        </>
      ) : (
        <>
          {loading && <Spinner />}
        </>
      )}
    </Container>
  );
};

DetailsSection.propTypes = {
  restaurant: PropTypes.objectOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DetailsSection;
