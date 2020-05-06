import React from 'react'
import {Card} from 'primereact/card';
import 'App.css'

const PageHeader = (props) => {
  return <Card className='p-card-scotchy page-header'><span style={{fontSize: '2em', color: 'darkgreen'}}>{props.title}</span></Card>
}

export default PageHeader