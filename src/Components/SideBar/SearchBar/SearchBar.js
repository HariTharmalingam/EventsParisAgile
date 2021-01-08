import React from 'react'
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { searchByName, initialSearch, setTextSearch } from "./../../../Actions/SearchEngine";
import moment from 'moment'
import { Search } from 'react-bootstrap-icons'

class SearchBar extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        searchQuery: this.props.ResultsReducer.textSearch !== "" ? this.props.ResultsReducer.textSearch : '',
        list: []
      }
  }

  componentDidUpdate(nextProps) {
    const { searchQuery } = this.state;
    if(nextProps.ResultsReducer.textSearch !== searchQuery) {
      this.setState({
        searchQuery: nextProps.ResultsReducer.textSearch
      })
    }
  }

  componentDidMount(){
    let datesearch = this.props.ResultsReducer.dateSearch !== '' ? this.props.ResultsReducer.dateSearch : moment().format('YYYY-MM-DD')

    this.props.ResultsReducer.textSearch !== "" || this.props.ResultsReducer.dateSearch !== ''  ? this.props.searchByName(this.props.ResultsReducer.textSearch, datesearch) : this.props.initialSearch()
  }

  async setKeywords(e){
    this.setState({searchQuery: e.target.value}); 
    this.props.setTextSearch(e.target.value)
    let datesearch = this.props.ResultsReducer.dateSearch !== '' ? this.props.ResultsReducer.dateSearch : moment().format('YYYY-MM-DD')
    await this.props.searchByName(e.target.value, datesearch)
  }

  render() {
    const {searchQuery} = this.state
    return (
        <div>
            <InputGroup className="p-3">
                <FormControl
                placeholder="Search for an event"
                aria-label="Search for an event"
                aria-describedby="basic-addon2"
                value={searchQuery}
                onInput={e => this.setKeywords(e)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={e => searchByName(searchQuery)}><Search size={20} /></Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  ResultsReducer : state.ResultsReducer
})


export default connect(mapStateToProps, {searchByName, initialSearch, setTextSearch})(SearchBar);