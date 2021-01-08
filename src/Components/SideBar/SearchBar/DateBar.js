import React from 'react'
import { connect } from 'react-redux';
import {  setDateSearch, searchByName } from "./../../../Actions/SearchEngine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { Calendar3 } from 'react-bootstrap-icons'

class DateBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date : this.props.ResultsReducer.dateSearch !== '' ? Date.parse(this.props.ResultsReducer.dateSearch) : Date.now()
    }
    this.datePickerRef = React.createRef();
  }

  async setDate(e){
    this.setState({
      date : Date.parse(e)
    })
    this.props.setDateSearch(moment(e).format('YYYY-MM-DD'))
    await this.props.searchByName(this.props.ResultsReducer.textSearch , moment(e).format('YYYY-MM-DD'))
  }

  render() {
    const { date } = this.state;
    return (
      <div style={{textAlign: "center" }}>
        <Calendar3 size={32}/>
        <DatePicker 
        ref={this.datePickerRef}
        className={"p-1 m-3"}
        dateFormat="dd/MM/yyyy"
        selected={date} 
        onChange={(e) => this.setDate(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ResultsReducer : state.ResultsReducer
})

export default connect(mapStateToProps, {setDateSearch, searchByName})(DateBar);