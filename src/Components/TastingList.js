import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';

import '../App.css';
import ScotchService from '../Services/scotch-service'

class TastingList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {tastings: []};
    this.scotchservice = new ScotchService()
  }
  
  componentDidMount() {
    this.scotchservice.getTastings().then(data => this.setState({tastings: data}));
  }

//Templates
  ratingTemplate(rowData, column) {
    return <Rating value={rowData.rating} stars={5} readonly={true} cancel={false}/>
  }

  render () {
    return (
      <>
        <DataTable value={this.state.tastings} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="dramName" header="Dram" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="rating" header="Rating" sortable={true} filter={true} filterMatchMode="contains" body={this.ratingTemplate} />
          <Column field="location" header="Location" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="personal" header="Personal" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default TastingList;
