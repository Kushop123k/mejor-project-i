import { images } from "../searchItem/SearchItem";
import "./propertyList.css";
const types = [
  {
    heading: "hotels",
    number: 233
  },
  {
    heading: "Apertments",
    number: 2331
  },
  {
    heading: "Resorts",
    number: 233
  },
  {
    heading: "Villa",
    number: 233
  },
  {
    heading: "Cabins",
    number: 233
  },
]
const PropertyList = () => {
  return (
    <div className="pList">
      {(
        types.map((item, index) => (
          <div className="pListItem">
            <img
              src={images[Math.floor(Math.random() * images.length)]}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{item.heading}</h1>
              <h2>{item.number} hotels</h2>
            </div>
          </div>
        )))
      }
    </div>
  );
};

export default PropertyList;
