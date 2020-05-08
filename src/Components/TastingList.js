import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { connect } from 'react-redux'
import { fetchTastings } from '../Redux/actions/tastings'

import '../App.css';

class TastingList extends Component {
    
  componentDidMount() {
    this.props.fetchTastings()
  }

//Templates
  ratingTemplate(rowData, column) {
    return <Rating value={rowData.rating} stars={5} readonly={true} cancel={false}/>
  }

  render () {
    return (
      <>
        <DataTable value={this.props.tastings} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="dramName" header="Dram" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="rating" header="Rating" sortable={true} filter={true} filterMatchMode="contains" body={this.ratingTemplate} />
          <Column field="location" header="Location" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="personal" header="Personal" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchTastings
}

const mapStateToProps = state => ({
  tastings: state.tastings.tastings,
  isLoading: state.tastings.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(TastingList)