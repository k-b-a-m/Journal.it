import React from "react";
import { connect } from "react-redux";

const Home = props => {
  const { entries } = props;
  console.log(entries);

  return (
    <div>
      <div className="container-fluid entry-container">
        <h3>Location</h3>
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
            {entry.content}
            {entry.latitude}
            {entry.longitude}
            {entry.likes}
            {entry.createdAt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { entries: state };
};

export default connect(mapStateToProps)(Home);
