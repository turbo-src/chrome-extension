import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

let rootcontainer = document.querySelectorAll('#rootcontainer');
if (rootcontainer.length) {
  ReactDOM.render(<App />, document.getElementById('rootcontainer'))
}