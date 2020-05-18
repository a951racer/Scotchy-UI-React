import React, { Component } from 'react';
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { deleteTastingNote } from '../../Redux/actions/tastingNotes'

import '../../App.css';

class DeleteTastingNoteDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false
    }
    this.delete = this.delete.bind(this)
    this.cancelDeleteTastingNote = this.cancelDeleteTastingNote.bind(this)
    this.deleteTastingNote = this.deleteTastingNote.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  // Delete TastingNote //

  delete() {
    this.toggleDialog()
  }

  cancelDeleteTastingNote() {
    this.toggleDialog()
  }

  async deleteTastingNote() {
    await this.props.deleteTastingNote(this.props.outTastingNote)
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelDeleteTastingNote}/>
                        <Button label="Delete" icon="pi pi-trash" className="scotchy-button" onClick={this.deleteTastingNote}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={this.delete} ></i>

        <Dialog visible={this.state.displayDialog} tastingNote={{width:'300px'}} header="Delete TastingNote" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
              <span>Confirm:  Delete tasting note for {this.props.outTastingNote.dramName}?</span>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { deleteTastingNote }

export default connect(null, mapDispatchToProps)(DeleteTastingNoteDialog)