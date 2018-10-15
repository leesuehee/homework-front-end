import React from 'react';
let giphy = require('./../../key.js')
let GphApiClient = require('giphy-js-sdk-core')

let client = GphApiClient(giphy.key)

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      search   :'',
      results  :[],
    }
  }

  handleChange(event) {
    this.setState({search:event.target.value})
  }
  
  handleSearch(event) {
    let query =  this.state.search;
    client.search("gifs", {"q": query})
      .then((response) => {
        response.data.forEach((gifObject) => {
          console.log(gifObject)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    let search = this.state.search;
    return (
      <div className='search-component'>
        <input value={search} onChange={this.handleChange}></input>
        <button onClick={this.handleSearch}> search</button>
      </div>  
    )
  }
}

//TODOs: refactor Search into a stateless component where props are passed
//       from App component 