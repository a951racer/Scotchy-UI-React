import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button'
import { connect } from 'react-redux'
//import moment from 'moment'
import { fetchTastingNotes } from '../../Redux/actions/tastingNotes'
import NewTastingNoteDialog from './NewTastingNoteDialog'
import EditTastingNoteDialog from './EditTastingNoteDialog'
import DeleteTastingNoteDialog from './DeleteTastingNoteDialog'

import '../../App.css';

class TastingNoteList extends Component {

  constructor(props) {
    super(props)
    this.state ={
      showDetailDialog: false,
      selected: {},
      personal: null,
      rating: null
    }
    this.toggleDialog = this.toggleDialog.bind(this)

    this.personalTemplate = this.personalTemplate.bind(this);
    this.ratingTemplate = this.ratingTemplate.bind(this);
    this.detailTemplate = this.detailTemplate.bind(this)
    this.editButtonTemplate = this.editButtonTemplate.bind(this)
    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)

    this.onPersonalFilterChange = this.onPersonalFilterChange.bind(this);
    this.personalFilter = this.personalFilter.bind(this);
    this.onRatingFilterChange = this.onRatingFilterChange.bind(this);
    this.ratingFilter = this.ratingFilter.bind(this);
  }

  componentDidMount() {
    this.props.fetchTastingNotes()
  }

  toggleDialog(data) {
    this.setState({selected: data, showDetailDialog: true})
  }

//Templates
  ratingTemplate(rowData) {
    return <Rating value={rowData.rating} stars={5} readonly={true} cancel={false}/>
  }

  personalTemplate(rowData) {
    return <Checkbox checked={rowData.personal} />
  }

  detailTemplate(rowData) {
    return (
      <i className="pi pi-fw pi-search scotchy-icon-link" onClick={() => this.toggleDialog(rowData)} style={{width: '.1em'}}></i>
    );
  }

  deleteButtonTemplate(rowData) {
    return ( <DeleteTastingNoteDialog outTastingNote={rowData}/> );
  }

  editButtonTemplate(rowData) {
    return ( <EditTastingNoteDialog tastingNote={rowData}/> );
  }

// Filters //
  onPersonalFilterChange(event) {
    this.dt.filter(event.value, 'personal', 'custom');
    this.setState({personal: event.value});
  }

  personalFilter(value, filter) {
    return (filter && value) || (!filter && !value)
  }

  onRatingFilterChange(event) {
    this.dt.filter(event.value, 'rating', 'custom');
    this.setState({rating: event.value});
  }

  ratingFilter(value, filter) {
    return value >= filter
}

/////////////////////

  render () {
    const personalFilterInput = <TriStateCheckbox value={this.state.personal} onChange={this.onPersonalFilterChange}/>
    const ratingFilterInput = <Rating value={this.state.rating} stars={5} readonly={false} cancel={true} onChange={this.onRatingFilterChange} style={{textAlign:'right'}}/>
    const detailDialogFooter = <div style={{textAlign: 'center'}}><Button label="Close" icon="pi pi-times" onClick={() => this.setState({showDetailDialog: false})} /></div>

    return (
      <>
        <NewTastingNoteDialog />
        <DataTable
          ref={(el) => { this.dt = el; }}
          value={this.props.tastingNotes}
          paginator={true}
          rows={15}
          rowHover={true}
          autoLayout={true}
          dataKey="id"
          className="p-datatable-scotchy"
        >
          <Column body={this.detailTemplate}></Column>
          <Column field="dateAddedPretty" header="Date" sortable={true} />
          <Column field="dramName" header="Dram" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="rating" header="Rating" sortable={true} filter={true} filterMatchMode="custom" filterFunction={this.ratingFilter} filterElement={ratingFilterInput} body={this.ratingTemplate} style={{textAlign:'right', width: '10.5em'}} headerStyle={{textAlign: 'center'}}/>
          <Column field="location" header="Location" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="personal" header="Personal" sortable={true} filter={true} filterMatchMode="custom" filterFunction={this.personalFilter} filterElement={personalFilterInput} style={{textAlign:'center', width: '8em'}} body={this.personalTemplate} />
          <Column body={this.editButtonTemplate} bodyStyle={{width: '2em'}}/>
          <Column body={this.deleteButtonTemplate} bodyStyle={{width: '2em'}}/>
        </DataTable>

        <Dialog header={this.state.selected.dramName} footer={detailDialogFooter} visible={this.state.showDetailDialog} style={{width: '50vw'}} modal={true} onHide={() => this.setState({showDetailDialog: false})}>
          <div className="p-grid p-fluid">
            <div className="p-col-12 p-md-9">
              <div className="p-grid">
              <Rating value={this.state.selected.rating} stars={5} readonly={true} cancel={false} className='scotchy-rating'/>
                <div className="scotchy-form-label">Nose: </div>
                <div style={{marginLeft: '1em', marginBottom: '1.5em'}}>{this.state.selected.nose}</div>

                <div className="scotchy-form-label">Palate: </div>
                <div style={{marginLeft: '1em', marginBottom: '1.5em'}}>{this.state.selected.palate}</div>

                <div className="scotchy-form-label">Finish: </div>
                <div style={{marginLeft: '1em', marginBottom: '1.5em'}}>{this.state.selected.finish}</div>

                <div className="scotchy-form-label">Comment: </div>
                <div style={{marginLeft: '1em'}}>{this.state.selected.comment}</div>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchTastingNotes
}

const mapStateToProps = state => ({
  tastingNotes: state.tastingNotes.tastingNotes,
  isLoading: state.tastingNotes.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(TastingNoteList)