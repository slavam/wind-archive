import React, {Component} from 'react';
import './WindContainer.css';
import WindStats from '../components/WindStats/WindStats';
const initWind = [];
for (let i=0; i<31; i++){
  let a = [];
  for (let j=0; j<8; j++){
    a[j] = 10*i + j;
  }
  initWind[i] = a;
}
class WindContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      windstats: [],
      wind: initWind,
      month: 1,
      year: 1991
    }
  }
  calculateStats = (wind) => {
    // alert(JSON.stringify(wind[1]))
    const numDays = 31; //wind.length;
    let row = [0,0,0,0,0,0,0,0,0,0,0]
    
    for (let i=0; i<numDays; i++){
      for (let j=0; j<8; j++){
        const val = parseInt(wind[i][j]);
        row[10] += 1  // total
        if(val == 0){
          row[9] += 1; // calm
        } else {
          row[8] += 1;
          if (val < 23)
            row[0] += 1;
          else if (val < 68)
            row[1] += 1;
          else if(val < 113) 
            row[2] += 1;
          else if (val < 158)
            row[3] += 1;
          else if(val < 203)
            row[4] += 1;
          else if(val < 248)
            row[5] += 1;
          else if(val < 293)
            row[6] += 1;
          else if (val < 338)
            row[7] += 1;
          else
            row[0] += 1;
        }
      }
    }
    console.log(JSON.stringify(row));
    return row;
  }
  statsUpdate = () => {
    this.setState({
      windstats: this.calculateStats(this.state.wind)
    })  
  }
  componentDidMount() {
    this.statsUpdate(); 
  }
  render() {
    return (
      <form className="wind-container">
        <h1>Wind archive</h1>
        <WindStats windstats={this.state.windstats} />
      </form>
    )
  }
}
export default WindContainer;