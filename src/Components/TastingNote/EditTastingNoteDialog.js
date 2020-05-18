import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Rating } from 'primereact/rating';
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'


import { connect } from 'react-redux'

import { saveTastingNote } from '../../Redux/actions/tastingNotes'
import { fetchScotches } from '../../Redux/actions/scotches'

import '../../App.css';

class EditTastingNoteDialog extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showDialog: false,
      tastingNote: this.props.tastingNote
    }
    this.updateProperty = this.updateProperty.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    this.props.fetchScotches()
  }

  updateProperty(property, value) {
    const tastingNote = {...this.state.tastingNote, [property]: value}
    this.setState({
      tastingNote: tastingNote
    })
  }

  cancel() {
    this.setState({
      showDialog: false
    })
  }

  async save() {
    this.props.saveTastingNote(this.state.tastingNote)
    this.setState({
      showDialog: false
    })
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancel}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.save}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-pencil scotchy-icon-link" onClick={() => this.setState({showDialog: true})} ></i>

        <Dialog visible={this.state.showDialog} style={{width:'25vw'}} header={'New Tasting Note'} modal={true} footer={dialogFooter} onHide={this.cancel}>
          {
            <div className="p-grid p-fluid">
            <div className="p-col-4 scotchy-form-label"><label htmlFor="scotchId">Dram</label></div>
            <div className="p-col-8">
              <Dropdown id="scotchId" value={this.state.tastingNote.scotchId} options={this.props.scotches} optionLabel="dramName" optionValue="_id" style={{width: '15em'}} scrollHeight='200px' onChange={(e) => {this.updateProperty('scotchId', e.target.value)}} />
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="location">Location</label></div>
            <div className="p-col-8">
              <InputText id="location" onChange={(e) => {this.updateProperty('location', e.target.value)}} value={this.state.tastingNote.location}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="dateAdded">Date</label></div>
            <div className="p-col-8">
              <InputText id="dateAdded" onChange={(e) => {this.updateProperty('dateAdded', e.target.value)}} value={this.state.tastingNote.dateAdded}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="personal">Personal</label></div>
            <div className="p-col-8">
              <Checkbox onChange={(e) => this.updateProperty('personal', e.target.checked)} checked={this.state.tastingNote.personal} />
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="rating">Rating</label></div>
            <div className="p-col-8">
              <Rating value={this.state.tastingNote.rating} stars={5} readonly={false} cancel={true} onChange={(e) => {this.updateProperty('rating', e.target.value)}}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="nose">Nose</label></div>
            <div className="p-col-8">
              <InputText id="nose" onChange={(e) => {this.updateProperty('nose', e.target.value)}} value={this.state.tastingNote.nose}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="palate">Palate</label></div>
            <div className="p-col-8">
              <InputText id="palate" onChange={(e) => {this.updateProperty('palate', e.target.value)}} value={this.state.tastingNote.palate}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="finish">Finish</label></div>
            <div className="p-col-8">
              <InputText id="finish" onChange={(e) => {this.updateProperty('finish', e.target.value)}} value={this.state.tastingNote.finish}/>
            </div>

            <div className="p-col-4 scotchy-form-label"><label htmlFor="comment">Comment</label></div>
            <div className="p-col-8">
              <InputText id="comment" onChange={(e) => {this.updateProperty('comment', e.target.value)}} value={this.state.tastingNote.comment}/>
            </div>
        </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { fetchScotches, saveTastingNote }

const mapStateToProps = state => ({
  scotches: state.scotches.scotches
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTastingNoteDialog)