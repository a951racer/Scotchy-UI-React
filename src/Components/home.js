import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';

import '../App.css'
import ScotchService from '../Services/scotch-service'

class Home extends Component {
    
  constructor(props) {
    super(props);
    this.state = {scotches: []};
    this.scotchservice = new ScotchService();
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
    this.flavorEditor = this.flavorEditor.bind(this);
  
  }
  
  componentDidMount() {
    this.scotchservice.getScotches().then(data => this.setState({scotches: data}));
  }

  onEditorValueChange(props, value) {
    let updatedScotches = [...this.state.scotches];
    updatedScotches[props.rowIndex][props.field] = value;
    this.setState({cars: updatedScotches});
  }

  flavorEditor(props) {
    return <InputText type="text" value={this.state.scotches[props.rowIndex]['flavor']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  render () {
    return (
      <>
        <DataTable value={this.state.scotches} paginator={true} rows={20} rowHover="true" autoLayout="true" dataKey="id">
          <Column field="distillerName" header="Distiller" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="flavor" header="Flavor" sortable="true" filter="true" filterMatchMode="contains" editor={this.flavorEditor}/>
          <Column field="age" header="Age" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="style" header="Style" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="region" header="Region" sortable="true" filter="true" filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default Home;
