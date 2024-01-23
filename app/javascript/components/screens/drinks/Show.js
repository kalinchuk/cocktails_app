import React, { useState, useEffect } from "react"
import PropTypes from "prop-types";
import DrinksApi from "../../../apis/DrinksApi";

const Show = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState({});

  useEffect(() => {
    DrinksApi
      .details(id)
      .then((response) => {
        setLoading(false);
        setResource((response?.data?.drinks || [])[0] || {})
      });
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <React.Fragment>
      <a href="javascript:history.back()">Back to list</a>
      <h1>{resource.name}</h1>
      <b>{resource.container}</b>
      <p>
        <img src={resource.image} height={400} width="auto"/>
      </p>
      <h2>Instructions</h2>
      <p>{resource.instructions}</p>
      <h2>Ingredients</h2>
      <ul>
        {
          resource
            .ingredients
            ?.map((ing, idx) => <li key={idx}>{ing.name} - {ing.measurement}</li>)
        }
      </ul>
    </React.Fragment>
  );
};

Show.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default Show;