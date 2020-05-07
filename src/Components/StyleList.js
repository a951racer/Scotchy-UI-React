import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import '../App.css';
import api from '../API/scotch'

class StyleList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      styles: []
    };
    this.api = new api()
  }
  
  componentDidMount() {
    this.api.getStyles().then(data => this.setState({styles: data}));
  }

  render () {
    return (
      <>
        <DataTable value={this.state.styles} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="name" header="Style"/>
        </DataTable>
      </>
    )
  }
}

export default StyleList;
