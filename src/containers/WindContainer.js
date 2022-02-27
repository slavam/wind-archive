import React, {Component} from 'react';
import './WindContainer.css';
import WindStats from '../components/WindStats/WindStats';
import WindSearchForm from '../components/WindSearch/WindSearch';
const stations = ['','Донецк','Амвросиевка','Дебальцево','','','','','','','Седово'];
const months = ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const stationsArray = [];
stations.map((s,i) => {return (s !== '') ? stationsArray.push({label: s, value: i}) : null});
const monthsArray = [];
months.map((m, i) => {return (m !== '') ? monthsArray.push({label: m, value: i}) : null});
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
      stationId: 1,
      month: 1,
      year: 1991
    }
  }
  calculateStats = (wind) => {
    // alert(JSON.stringify(wind[1]))
    const numDays = wind.length;
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
    const stationName = stations[this.state.stationId];
    let rows = [0,0,0,0,0,0,0,0,0,0,0];
    const daysInMonth = new Date(+this.state.year, +this.state.month, 0).getDate();
    if(this.state.wind)
      for(let j=0; j<daysInMonth; j++){
        for(let i=0; i<8; i++){
          let val = this.state.wind[j][i]===null ? null : +this.state.wind[j][i];
          if (val!==null){
            rows[10] += 1  // total
            if(val == 0){
              rows[9] += 1; // calm
            } else {
              rows[8] += 1;
              if(val < 23)
                rows[0] += 1;
              else if (val < 68)
                rows[1] += 1;
              else if (val < 113)
                rows[2] += 1;
              else if(val < 158)
                  rows[3] += 1;
              else if(val < 203)
                rows[4] += 1;
              else if (val < 248)
                rows[5] += 1;
              else if (val < 293)
                rows[6] += 1;
              else if (val < 338)
                rows[7] += 1;
              else
                rows[0] += 1;
            }
          }
        }
      }
    let rowNum = <tr><td>Количество</td><td>{rows[0]}</td><td>{rows[1]}</td><td>{rows[2]}</td><td>{rows[3]}</td><td>{rows[4]}</td><td>{rows[5]}</td><td>{rows[6]}</td><td>{rows[7]}</td><td>{rows[8]}</td><td>{rows[9]}</td><td>{rows[10]}</td></tr>
    let pRhumb = [];
    if(rows[8]!=0){
      for(let m=0; m<8; m++){
        pRhumb.push(<td key={m}>{rows[m]!=0 ? (rows[m]*100/rows[8]).toFixed(2) : ''}</td>);
      }
    }
    let pCalm = rows[9]!=0 && rows[10]!=0 ? (rows[9]*100/rows[10]).toFixed(2) : '';
    let rowPerc = <tr><td>Проценты</td>{pRhumb}<td></td><td>{pCalm}</td><td></td></tr>
    return (
      <form className="wind-container">
        <h1>Wind archive</h1>
        <h4>Задайте станцию, год и месяц</h4>
        <WindSearchForm stations={stationsArray} year={this.state.year} months={monthsArray} />
        <h4>Распределение ветра по направлениям на станции {stationName} за {months[this.state.month]} {this.state.year} года</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>С</th>
              <th>СВ</th>
              <th>В</th>
              <th>ЮВ</th>
              <th>Ю</th>
              <th>ЮЗ</th>
              <th>З</th>
              <th>СЗ</th>
              <th>С ветром</th>
              <th>Штиль</th>
              <th>Всего</th>
            </tr>
          </thead>
          <tbody>
            {rowNum}
            {rowPerc}
          </tbody>
        </table>
        {/*<WindStats windstats={this.state.windstats} />*/}
      </form>
    )
  }
}
export default WindContainer;