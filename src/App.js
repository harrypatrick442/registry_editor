import React from 'react';
import logo from './logo.svg';
import './app.css';
import PathSelector from './PathSelector';
import ValueViewer from './ValueViewer';
import SplitPane, { Pane } from 'react-split-pane';
function App() {
  return (
    <div className="App">
			<PathSelector editValue={editValue}>
			</PathSelector>
			<ValueViewer>
			</ValueViewer>
    </div>
  );
  function editValue(obj){
	  
  }
}

export default App;
