import React, { useState, useEffect } from 'react';
import "./searchItem.css";
import { Link, Navigate } from 'react-router-dom';
export const images = [
  'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715558400&semt=sph',
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUc6jmFYFGYfzKyod14Ar_5gVCtfRKIGDOvUTJjSRRWw&s",
  " https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720",
  "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
  "https://www.savills.co.uk/_images/adobestock-539646437.jpg",
  "https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000",
  "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1",
 
]
const SearchItem = (props) => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [features, setFeatures] = useState([])

  const handleAvailabilityClick = () => {
    setRedirectToHome(true);  // Set the state to true to trigger navigation
  };
  useEffect(() => {
    const feature = Object.entries(props).filter(([key, value]) => value === "true").map(([key]) => key.match(/is(.*)/)[1])
    setFeatures(feature)
  }, [])
  if (redirectToHome) {
    return <Navigate to="/hotel" />; // This will redirect the user to the home page when set
  }

  return (
    <div className="searchItem">
      <img
        src={images[Math.floor(Math.random() * images.length)]}
        alt=""
        className="siImg"

      />
      <div className="siDesc">
        <h1 className="siTitle">{props.hotelName}</h1>
        <span className="siSubtitle">
          {props.description}</span>
        <span className="siFeatures">
          {
            features.map((item, index) => (
              <span key={index}>
                <span>
                  {item}
                </span>
                {index !== (features.length-1) && " • "}
              </span>
            ))
          }
        </span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{(7+Math.random()*3).toFixed(1)}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{props.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotel/${props.id}`}  className="siCheckButton">See availability</Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
