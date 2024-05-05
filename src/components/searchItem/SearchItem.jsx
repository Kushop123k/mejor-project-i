import React, { useState, useEffect } from 'react';
import "./searchItem.css";

const SearchItem = () => {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-backend-url/api/items');  // URL to your API
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.error('Failed to fetch item data:', error);
      }
    };

    fetchData();
  }, []);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="searchItem">
      <img
        src={itemData.imageURL}
        alt={itemData.name}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{itemData.name}</h1>
        <span className="siDistance">{itemData.distance} from center</span>
        <span className="siTaxiOp">{itemData.freeTaxi ? 'Free airport taxi' : ''}</span>
        <span className="siSubtitle">
          {itemData.description}
        </span>
        <span className="siFeatures">
          {itemData.features}
        </span>
        <span className="siCancelOp">{itemData.cancellationPolicy}</span>
        <span className="siCancelOpSubtitle">
          {itemData.cancellationSubtext}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{itemData.ratingLabel}</span>
          <button>{itemData.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{itemData.price}</span>
          <span className="siTaxOp">{itemData.taxInfo}</span>
          <div className="siRoomAvailability">
            <span className="siAvailableRooms">Available Rooms: {itemData.availableRooms}</span>
           
          </div>
          <button className="siCheckButton">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
