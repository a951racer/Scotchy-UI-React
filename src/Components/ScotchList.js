import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Growl } from 'primereact/growl';
import { connect } from 'react-redux'
import { fetchScotches } from '../Redux/actions/scotches'
import { fetchStyles } from '../Redux/actions/styles'
import { fetchRegions } from '../Redux/actions/regions'

import '../App.css'
import api from '../API/scotch'

class ScotchList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      inStock: null,
      age: null,
      style: null,
      region: null,
      expandedRows: null,
    };
    this.api = new api();
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
    this.textEditor = this.textEditor.bind(this);
    this.checkboxEditor = this.checkboxEditor.bind(this);
    this.inStockTemplate = this.inStockTemplate.bind(this);
    this.onInStockFilterChange = this.onInStockFilterChange.bind(this);
    this.onStyleFilterChange = this.onStyleFilterChange.bind(this);
    this.onRegionFilterChange = this.onRegionFilterChange.bind(this);
    this.inStockFilter = this.inStockFilter.bind(this);
    this.clonedScotches = []
    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditSave = this.onRowEditSave.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
  }
  
  async componentDidMount() {
    this.props.fetchScotches()
    this.props.fetchStyles()
    this.props.fetchRegions()
  }

// Row Edit Functions
  onRowEditInit(event) {
    this.clonedScotches[event.data.id] = {...event.data};
  }

  onRowEditSave(event) {
    console.log("row save: ", event.data)
    delete this.clonedScotches[event.data.id];
    // Save to API
    this.api.saveScotch(event.data)
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Cabinet has been updated'});
  }

  onRowEditCancel(event) {
    let scotches = [...this.props.scotches];
    scotches[event.index] = this.clonedScotches[event.data.id];
    delete this.clonedScotches[event.data.id];
    this.setState({
        scotches
    })
  }

// Editor control functions
  onEditorValueChange(props, value) {
    console.log("changing")
    let updatedScotches = [...this.props.scotches];
    updatedScotches[props.rowIndex][props.field] = value;
    this.setState({scotches: updatedScotches});
  }

// Editors
  textEditor(props) {
    return <InputText type="text" value={this.props.scotches[props.rowIndex][props.field]} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  checkboxEditor(props) {
    return <Checkbox onChange={(e) => this.onEditorValueChange(props, e.target.checked)} checked={this.props.scotches[props.rowIndex][props.field]} />
  }

//Templates
  inStockTemplate(rowData, column) {
    return <Checkbox checked={rowData.inStock} />
  }

// Filters
  onInStockFilterChange(event) {
    this.dt.filter(event.value, 'inStock', 'custom');
    this.setState({inStock: event.value});
  }

  inStockFilter(value, filter) {
    return (filter && value) || (!filter && !value)
  }

  onStyleFilterChange(event) {
    this.dt.filter(event.value, 'style', 'contains');
    this.setState({style: event.value});
  }

  onRegionFilterChange(event) {
    this.dt.filter(event.value, 'region', 'contains');
    this.setState({region: event.value});
  }

///////  RENDER /////////////
  render () {
    let inStockFilterInput = <TriStateCheckbox value={this.state.inStock} onChange={this.onInStockFilterChange}/>
    let styleFilterInput = <Dropdown value={this.state.style} options={this.props.styles} optionLabel="name" optionValue="name" showClear={true} style={{width: '10em'}} onChange={this.onStyleFilterChange} placeholder="Filter by style"/>
    let regionFilterInput = <Dropdown value={this.state.region} options={this.props.regions} optionLabel="name" optionValue="name" showClear={true} style={{width: '11em'}} onChange={this.onRegionFilterChange} placeholder="Filter by region"/>

    return (
        this.props.isLoading ? <span style={{textAlight: 'center'}}><ProgressSpinner/></span> :
          <>
            <DataTable
              ref={(el) => { this.dt = el; }}
              value={this.props.scotches}
              paginator={true}
              rows={20}
              rowHover={true}
              autoLayout={true}
              dataKey="id"
              editMode="row"
              className="p-datatable-scotchy"
              onRowEditInit={this.onRowEditInit}
              onRowEditSave={this.onRowEditSave}
              onRowEditCancel={this.onRowEditCancel}
            >
              <Column rowEditor={true} />
              <Column field="distillerName" header="Distiller" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
              <Column field="flavor" header="Flavor" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
              <Column field="age" header="Age" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} filterHeaderStyle={{width: '5.5em'}} style={{textAlign: 'center'}}/>
              <Column field="style" header="Style" sortable={true} filter={true} filterMatchMode="contains" filterElement={styleFilterInput} editor={this.textEditor}/>
              <Column field="region" header="Region" sortable={true} filter={true} filterMatchMode="contains" filterElement={regionFilterInput} editor={this.textEditor}/>
              <Column field="inStock" header="In Stock" filter={true} filterMatchMode="custom"  filterFunction={this.inStockFilter} filterElement={inStockFilterInput} body={this.inStockTemplate} style={{textAlign:'center'}} editor={this.checkboxEditor}/>
            </DataTable>
            <Growl ref={(el) => this.growl = el} />
          </>
    )
  }
}

const mapDispatchToProps = {
  fetchScotches,
  fetchStyles,
  fetchRegions
}

const mapStateToProps = state => ({
  scotches: state.scotches.scotches,
  styles: state.styles.styles,
  regions: state.regions.regions,
  isLoading: state.scotches.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(ScotchList)