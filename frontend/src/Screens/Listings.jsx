import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'

// Sorry for really ugly code here ... :(

function Listings (props) {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const owner = localStorage.getItem('email');
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getListings();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    padding: '1vw',
    gap: '1vw'
  };

  const mobileCardStyle = {
    textAlign: 'center',
    width: '44vw',
    padding: '1vw',
  };

  const cardStyle = {
    textAlign: 'center',
    width: '14vw',
    padding: '1vw',
  };

  const mobileThumbnailStyle = {
    objectFit: 'cover',
    width: '40vw',
    height: '40vw',
  }

  const thumbnailStyle = {
    objectFit: 'cover',
    width: '10vw',
    height: '10vw',
  }

  const handleClick = (id) => {
    localStorage.setItem('listingId', id);
    window.location.href = '/Listing';
  }

  function getListings () {
    const token = localStorage.getItem('token');

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/listings`, request)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
          });
        }
      }).then(data => {
        setListings(data.listings.sort((a, b) => a.title.localeCompare(b.title)));
      });
  }

  return (
    <>
      <div>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        {props.search || props.min || props.max
          ? null
          : <>
            {isMobile
              ? <>
                <div className='item-container' style={containerStyle}>
                {listings?.map(listing => {
                  if (listing.owner !== owner) {
                    return (
                      <Paper className='card' key={listing.id} style={mobileCardStyle} onClick={() => handleClick(listing.id)}>
                        <img src={listing.thumbnail} alt='' style={mobileThumbnailStyle}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                </div>
                </>
              : <>
                <div className='item-container' style={containerStyle}>
                  {listings?.map(listing => {
                    if (listing.owner !== owner) {
                      return (
                        <Paper className='card' key={listing.id} style={cardStyle} onClick={() => handleClick(listing.id)}>
                          <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
                          <h3>{listing.title}</h3>
                          <p>${listing.price}/night</p>
                        </Paper>
                      )
                    } else {
                      return (
                        <></>
                      )
                    }
                  })}
                </div>
                </>
            }
            </>
        }
        {props.search === '' && props.search
          ? <>
            {isMobile
              ? <>
                <div className='item-container' style={containerStyle}>
                {listings?.map(listing => {
                  if (listing.owner !== owner) {
                    return (
                      <Paper className='card' key={listing.id} style={mobileCardStyle} onClick={() => handleClick(listing.id)}>
                        <img src={listing.thumbnail} alt='' style={mobileThumbnailStyle}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                </div>
                </>
              : <>
                <div className='item-container' style={containerStyle}>
                {listings?.map(listing => {
                  if (listing.owner !== owner) {
                    return (
                      <Paper className='card' key={listing.id} style={cardStyle} onClick={() => handleClick(listing.id)}>
                        <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                </div>
                </>
            }
            </>
          : null
        }
        {props.search !== ''
          ? <>
            {isMobile
              ? <>
                <div className='item-container' style={containerStyle}>
                {listings?.filter(listing => listing.title.toLowerCase().includes(props.search)).map(filteredListing => {
                  if (filteredListing.owner !== owner) {
                    return (
                      <Paper className='card' key={filteredListing.id} style={mobileCardStyle} onClick={() => handleClick(filteredListing.id)}>
                        <img src={filteredListing.thumbnail} alt='' style={mobileThumbnailStyle}/>
                        <h3>{filteredListing.title}</h3>
                        <p>${filteredListing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (<></>)
                  }
                })}
                </div>
                </>
              : <>
                <div className='item-container' style={containerStyle}>
                {listings?.filter(listing => listing.title.toLowerCase().includes(props.search)).map(filteredListing => {
                  if (filteredListing.owner !== owner) {
                    return (
                      <Paper className='card' key={filteredListing.id} style={cardStyle} onClick={() => handleClick(filteredListing.id)}>
                        <img src={filteredListing.thumbnail} alt='' style={thumbnailStyle}/>
                        <h3>{filteredListing.title}</h3>
                        <p>${filteredListing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (<></>)
                  }
                })}
                </div>
                </>
            }
            </>
          : null
        }
        {((props.min !== '0') || (props.max !== '99999999'))
          ? <>
            {isMobile
              ? <>
                <div className='item-container' style={containerStyle}>
                {listings?.filter(listing => { return (listing.price >= parseInt(props.min, 10) && listing.price <= parseInt(props.max, 10)) }).map(filteredListing => {
                  if (filteredListing.owner !== owner) {
                    return (
                      <Paper className='card' key={filteredListing.id} style={mobileCardStyle} onClick={() => handleClick(filteredListing.id)}>
                        <img src={filteredListing.thumbnail} alt='' style={mobileThumbnailStyle}/>
                        <h3>{filteredListing.title}</h3>
                        <p>${filteredListing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (<></>)
                  }
                })}
                </div>
                </>
              : <>
                <div className='item-container' style={containerStyle}>
                {listings?.filter(listing => { return (listing.price >= parseInt(props.min, 10) && listing.price <= parseInt(props.max, 10)) }).map(filteredListing => {
                  if (filteredListing.owner !== owner) {
                    return (
                      <Paper className='card' key={filteredListing.id} style={cardStyle} onClick={() => handleClick(filteredListing.id)}>
                        <img src={filteredListing.thumbnail} alt='' style={thumbnailStyle}/>
                        <h3>{filteredListing.title}</h3>
                        <p>${filteredListing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (<></>)
                  }
                })}
                </div>
                </>
            }
            </>
          : <>
            {isMobile
              ? <>
                <div className='item-container' style={containerStyle}>
                {listings?.map(listing => {
                  if (listing.owner !== owner) {
                    return (
                      <Paper className='card' key={listing.id} style={mobileCardStyle} onClick={() => handleClick(listing.id)}>
                        <img src={listing.thumbnail} alt='' style={mobileThumbnailStyle}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                </div>
                </>
              : <>
                <div className='item-container' style={containerStyle}>
                {listings?.map(listing => {
                  if (listing.owner !== owner) {
                    return (
                      <Paper className='card' key={listing.id} style={cardStyle} onClick={() => handleClick(listing.id)}>
                        <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                      </Paper>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                </div>
                </>
            }
            </>
        }
        {/* {props.bed > 0
          ? <div className='item-container' style={containerStyle}>
            {listings?.map((listing, index) => (
              <div key={index}>
              {listing.metadata?.filter(data => { return (data.bedroom >= parseInt(props.bed, 10)) }).map(filteredListing => (
                <Paper className='card' key={listing.id} style={cardStyle}>
                  <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
                  <h3>{listing.title}</h3>
                  <p>${listing.price}/night</p>
                </Paper>
              ))}
              </div>
            ))}
          </div>
          : null
          } */}
      </div>
    </>
  );
}

Listings.propTypes = {
  search: PropTypes.string,
  bed: PropTypes.number,
  dateRange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string
};

export default Listings;
