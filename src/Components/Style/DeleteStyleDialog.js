import React, { Component } from 'react';
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { deleteStyle } from '../../Redux/actions/styles'

import '../../App.css';

class DeleteStyleDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false
    }
    this.delete = this.delete.bind(this)
    this.cancelDeleteStyle = this.cancelDeleteStyle.bind(this)
    this.deleteStyle = this.deleteStyle.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  // Delete Style //

  delete() {
    this.toggleDialog()
  }

  cancelDeleteStyle() {
    this.setState({newStyle: {}})
    this.toggleDialog()
  }

  async deleteStyle() {
    await this.props.deleteStyle(this.props.outStyle)
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelDeleteStyle}/>
                        <Button label="Delete" icon="pi pi-trash" className="scotchy-button" onClick={this.deleteStyle}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={this.delete} ></i>

        <Dialog visible={this.state.displayDialog} style={{width:'300px'}} header="Delete Style" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
              <span>Confirm:  Delete style '{this.props.outStyle.name}'?</span>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { deleteStyle }

export default connect(null, mapDispatchToProps)(DeleteStyleDialog)