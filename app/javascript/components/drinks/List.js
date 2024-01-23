import React, { useMemo, useState, useEffect } from "react"
import PropTypes from "prop-types";
import DrinksApi from "../../apis/DrinksApi";

const List = ({ searchQuery, customLimit }) => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(customLimit || 10);

  useEffect(() => {
    DrinksApi
      .search(searchQuery, index, 10)
      .then((response) => {
        setLoading(false);
        setResources(response?.data?.drinks || [])
      });
  }, [searchQuery, index]);

  useEffect(() => {
    setIndex(0);
  }, [searchQuery]);

  const renderPagination = useMemo(() => () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "150px"
        }}
      >
        <div>
          {index > 0 ? <a
            href="javascript:void(0)"
            onClick={() => setIndex(index - 1)}
          >prev page</a> : "prev page"}
        </div>
        <div>
          {resources.length === limit ? <a
            href="javascript:void(0)"
            onClick={() => setIndex(index + 1)}
          >next page</a> : "next page"}
        </div>
      </div>
    );
  }, [resources.length, limit, index]);

  return (
    <React.Fragment>
      {renderPagination()}

      <table width="700px">
        <thead>
          <tr>
            <th align="center" width={100}>Image</th>
            <th align="left">Name</th>
            <th align="left">Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loading/>}
          {resources.length > 0 && <ListRows resources={resources}/>}
          {resources.length === 0 && <EmptyList/>}
        </tbody>
      </table>

      {renderPagination()}
    </React.Fragment>
  );
};

const ListRows = ({ resources }) => (
  resources.map((resource, idx) => <ListRow resource={resource} key={idx}/>)
);

const ListRow = ({ resource }) => (
  <tr>
    <td><img src={resource.image} width={100} height="auto"/></td>
    <td><h3>{resource.name}</h3></td>
    <td>{resource.category}</td>
    <td>
      <a href={`/drinks/${resource.id}`}>Details</a>
    </td>
  </tr>
);

const EmptyList = () => (
  <tr>
    <td colSpan={4}>No results</td>
  </tr>
);

const Loading = () => (
  <tr>
    <td colSpan={4}>Loading...</td>
  </tr>
);

List.propTypes = {
  searchQuery: PropTypes.string,
  customLimit: PropTypes.number
};

export default List;