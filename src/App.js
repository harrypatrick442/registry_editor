import React from 'react';
import logo from './logo.svg';
import './app.css';
import PathSelector from './PathSelector';
import ValueViewer from './ValueViewer';
import SplitPane, { Pane } from 'react-split-pane';
function App() {
  return (
    <div className="App">
		<SplitPane split="vertical" minSize={50} defaultSize={100}>
			<PathSelector>
			</PathSelector>
			<ValueViewer>
			</ValueViewer>
		</SplitPane>
    </div>
  );
}

export default App;
