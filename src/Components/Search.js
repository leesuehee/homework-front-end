import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        search:''
      }
      
  }

  render() {
    return (
      <div className='search-component'>
        <input></input><button>search</button>
      </div>  
    )
  }
}

//TODOs: refactor Search into a stateless component where props are passed
//       from App component 