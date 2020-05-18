import React, { Component } from 'react';
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { deleteRegion } from '../../Redux/actions/regions'

import '../../App.css';

class DeleteRegionDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false
    }
    this.delete = this.delete.bind(this)
    this.cancelDeleteRegion = this.cancelDeleteRegion.bind(this)
    this.deleteRegion = this.deleteRegion.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  // Delete Region //

  delete() {
    this.toggleDialog()
  }

  cancelDeleteRegion() {
    this.setState({newRegion: {}})
    this.toggleDialog()
  }

  async deleteRegion() {
    await this.props.deleteRegion(this.props.outRegion)
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelDeleteRegion}/>
                        <Button label="Delete" icon="pi pi-trash" className="scotchy-button" onClick={this.deleteRegion}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={this.delete} ></i>

        <Dialog visible={this.state.displayDialog} region={{width:'300px'}} header="Delete Region" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
              <span>Confirm:  Delete region '{this.props.outRegion.name}'?</span>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { deleteRegion }

export default connect(null, mapDispatchToProps)(DeleteRegionDialog)