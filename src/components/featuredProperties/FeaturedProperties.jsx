import { useEffect, useState } from "react";
import "./featuredProperties.css";
import { getAllHotels } from "../service/Api";
import { images } from "../searchItem/SearchItem";

const FeaturedProperties = () => {
  const [hotels, setHotels] = useState([])
  async function getHotels() {
    const { data } = await getAllHotels()
    setHotels(data)
  }
  useEffect(() => {
    getHotels()
  }, [])
  return (
    <div className="fp">
      {
        hotels.slice(0,4).map((hotel) => (
          <div className="fpItem">
            <img
              src={images[Math.floor(Math.random() * images.length)]}
              alt=""
              className="fpImg"

            />
            <span className="fpName">{hotel.name}</span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">Starting from ${hotel.price}</span>
            <div className="fpRating">
              <button>{(7+Math.random()*3).toFixed(1)}</button>
              <span>Excellent</span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default FeaturedProperties;
