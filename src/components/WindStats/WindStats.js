import React from 'react';
import PropTypes from 'react';
import './WindStats.css';

const WindStats = (props) => {
  const listItems = props.windstats.map((stat,i) => (
    <li key={i}>
      <div className={'tesla-stats-icon '}></div>
      <p>{i}/{stat}/{(i<8 && props.windstats[8]!=0) ? stat*100/props.windstats[8] : (i==9 && props.windstats[10]!=0 ? stat*100/props.windstats[10]:'') }</p>
    </li>
  ));
  return (
    <div className="wind-stats">
    <ul>
      {listItems}  
    </ul>
  </div>
  )
};

// WindStats.propTypes = {
//   windstats: PropTypes.array
// }

export default WindStats;