import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tick from './Tick';
import Cross from './Cross';
import OpenIndicator from './OpenIndicator';

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
    font-size: 3em;
    font-weight: 500;
  }

  h6 {
    font-size: 0.9em;
    color: ${(props) => props.theme.colors.darkGrey};
  }

  .booking-delivery-container {
    margin: 1em 0;
    font-size: 0.9em;

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
    font-size: 0.9em;
    letter-spacing: 0.2em;
  }

  .large-p {
    margin-bottom: 1em;
    font-size: 1.2em;
  }
`;

const DetailsSection = ({ restaurant, loading }) => {
  if (loading) return <Container><p>loading...</p></Container>;

  let rest;
  let photoUrl;
  let address;
  let openingHours;
  let openNow;
  if (restaurant && restaurant.restaurant) {
    rest = restaurant.restaurant;
    photoUrl = rest.photos[0].photo.url;

    const streetNumber = rest.location.address.split(' ')[0];
    address = streetNumber + rest.location.locality_verbose;

    const { timings } = rest;
    const date = new Date();
    openingHours = getOpeningHours(timings, date);
    openNow = isOpenNow(openingHours, date);
  } else {
    rest = null;
  }

  return (
    <Container>
      {rest
        ? (
          <>
            <div className="image-container">
              <img src={photoUrl} alt={`${rest.name}`} />
            </div>
            <div>
              <h1>{rest.name}</h1>
              <h6>{address}</h6>
              <div className="booking-delivery-container">
                {rest.has_table_booking >= 0
                  ? (
                    <div>
                      <Tick height="2em" width="2em" /><p>Booking available</p>
                    </div>
                  )
                  : (
                    <div>
                      <Cross height="2em" width="2em" /><p>No bookings</p>
                    </div>
                  )}
                {rest.R.has_menu_status.delivery >= 0
                  ? (
                    <div>
                      <Tick height="2em" width="2em" /><p>Delivery available</p>
                    </div>
                  )
                  : (
                    <div>
                      <Cross height="2em" width="2em" /><p>No delivery</p>
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
                <OpenIndicator open={openNow} />
              </p>
            </div>
          </>
        )
        : null}
    </Container>
  );
};

DetailsSection.propTypes = {
  restaurant: PropTypes.objectOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DetailsSection;
