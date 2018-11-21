// main.js
import React from 'react';
import {render} from 'react-dom';

import Maincontainer from './containers/maincontainer';//网页中间






import './styles/main.css';//使用require导入css文件

render(<div >
	<Maincontainer/>
	</div>
	,document.getElementById('root'));

