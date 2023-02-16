import React from 'react';
import ReactDOM from 'react-dom/client';

const firstElement = <h1>Hello, World</h1>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(firstElement);
const subtext = ReactDOM.createRoot(document.getElementById('subtext'));
subtext.render(<p>testing</p>);

