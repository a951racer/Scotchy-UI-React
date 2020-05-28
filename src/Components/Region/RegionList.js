import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'
import { Growl } from 'primereact/growl';
import { connect } from 'react-redux'
import { fetchRegions, saveRegion } from '../../Redux/actions/regions'

import NewRegionDialog from './NewRegionDialog'
import DeleteRegionDialog from './DeleteRegionDialog'
import '../../App.css';

class RegionList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      editingRegion: null,
    }
    this.textEditor = this.textEditor.bind(this);

    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)

    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditSave = this.onRowEditSave.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegions()
  }

  // Row Edit Functions
  onRowEditInit(event) {
    const region = {...event.data}
    this.setState({editingRegion: region})
  }

  async onRowEditSave(event) {
    await this.props.saveRegion(this.state.editingRegion)
    this.setState({editingRegion: null})
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Region has been updated'});
  }

  onRowEditCancel(event) {
    this.setState({
        editingRegion: null
    })
  }

  // Editor control functions
  updateProperty(property, value) {
    const region = {...this.state.editingRegion, [property]: value}
    this.setState({
      editingRegion: region
    })
  }

  // Editors
  textEditor(props) {
    return <InputText type="text" value={this.state.editingRegion[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />;
  }

  //Templates
  deleteButtonTemplate(rowData) {
    return ( <DeleteRegionDialog outRegion={rowData}/> );
  }

///////////////////////////
  render () {

    return (
      <>
        <NewRegionDialog />
        <DataTable
          value={this.props.regions}
          paginator={true}
          rows={15}
          rowHover={true}
          autoLayout={true}
          dataKey="_id"
          className="p-datatable-scotchy"
          editMode="row"
          onRowEditInit={this.onRowEditInit}
          onRowEditSave={this.onRowEditSave}
          onRowEditCancel={this.onRowEditCancel}
        >
          <Column field="name" header="Region" editor={this.textEditor}/>
          <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
          <Column body={this.deleteButtonTemplate} bodyRegion={{width: '2em'}}/>
        </DataTable>

        <Growl ref={(el) => this.growl = el} />
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchRegions,
  saveRegion
}

const mapStateToProps = state => ({
  regions: state.regions.regions,
  isLoading: state.regions.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(RegionList)