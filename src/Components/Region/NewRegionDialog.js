import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { createRegion } from '../../Redux/actions/regions'

import '../../App.css';

class NewRegionDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false,
      newRegion: {
        name: ''
      }
    }
    this.updateProperty = this.updateProperty.bind(this)
    this.addNew = this.addNew.bind(this)
    this.cancelNewRegion = this.cancelNewRegion.bind(this)
    this.saveNewRegion = this.saveNewRegion.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  updateProperty(property, value) {
    const region = {...this.state.newRegion, [property]: value}
    this.setState({
      newRegion: region
    })
  }

  // Add New Region //

  addNew() {
    this.setState({newRegion: {name: ''}})
    this.toggleDialog()
  }

  cancelNewRegion() {
    this.setState({newRegion: {}})
    this.toggleDialog()
  }

  async saveNewRegion() {
    await this.props.createRegion(this.state.newRegion)
    this.setState({newRegion: {}})
    //this.growl.show({severity: 'success', summary: 'Created', detail: 'New region has been added.'});
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelNewRegion}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.saveNewRegion}/>
                      </div>;

    return (
      <>
        <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-primary scotchy-button"  onClick={this.addNew} ></Button>

        <Dialog visible={this.state.displayDialog} region={{width:'300px'}} header="New Region" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
                <div className="p-col-4 scotchy-form-label"><label htmlFor="name">Region</label></div>
                <div className="p-col-8">
                  <InputText id="name" onChange={(e) => {this.updateProperty('name', e.target.value)}} value={this.state.newRegion.name}/>
                </div>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { createRegion }

const mapStateToProps = state => ({
  regions: state.regions.regions
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRegionDialog)