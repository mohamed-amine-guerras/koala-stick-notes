import React, { Component, Fragment } from 'react';
import { h, getElementStyle } from './../utils';
import NavBar from './../navbar';
import Note from '../partials/note';
import NoteBubble from '../partials/note-bubble';

export class NormalView extends Component {

    constructor(props) {
		super(props);
		this.state = {};

		// Stores the initial position of the cursor
		this.coord = { x: 0, y: 0 };

		// This is the flag that we are going to use to
		// trigger drawing
		this.paint = false;
	}
    
	// Resizes the canvas to the available size of the window.
	resize = () => {
		this.props.callbacks.resizeCanvas(null, {width: document.body.clientWidth, height: document.body.clientHeight});
	}



	// Updates the coordianates of the cursor when
	// an event e is triggered to the coordinates where
	// the said event is triggered.
	getPosition = (event) => {
		this.coord.x = event.clientX - canvas.offsetLeft;
		this.coord.y = event.clientY - canvas.offsetTop;
	}

	// The following functions toggle the flag to start
	// and stop drawing
	startPainting = (event) => {
		if (!this.props.dragging) {
			this.paint = true;
			this.getPosition(event);
		}

	}
	stopPainting = () => {
		this.paint = false;
	}

	clearCanvas = () => {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	sketch = (event) => {
		let { paint, ctx, coord } = this;
		if (!paint) return;
		ctx.beginPath();

		ctx.lineWidth = 5;

		// Sets the end of the lines drawn
		// to a round shape.
		ctx.lineCap = 'round';

		ctx.strokeStyle = 'white';

		// The cursor to start drawing
		// moves to this coordinate
		ctx.moveTo(coord.x, coord.y);

		// The position of the cursor
		// gets updated as we move the
		// mouse around.
		this.getPosition(event);

		// A line is traced from start
		// coordinate to this coordinate
		ctx.lineTo(coord.x, coord.y);

		// Draws the line.
		ctx.stroke();
	}

    componentDidMount(){
        // wait for the content of the window element
		// to load, then performs the operations.
		// This is considered best practice.
		this.canvas = document.querySelector('#canvas');

		// Context for the canvas for 2 dimensional operations
		this.ctx = canvas.getContext('2d');

		this.ctx.canvas.width = this.props.canvasWidth;
		this.ctx.canvas.height = this.props.canvasHeight;

		document.addEventListener('mousedown', this.startPainting);
		document.addEventListener('mouseup', this.stopPainting);
		document.addEventListener('mousemove', this.sketch);
		window.addEventListener('resize', this.resize);


    }

    render(){
        
        const props = {...this.props, callbacks : {...this.props.callbacks, clearCanvas: this.clearCanvas}}
        return [
            h(NavBar, { ...props, key: 'navbar' }),
            h('canvas', {
                id: 'canvas',
                key: props.prefix+'--canvas', 
                className: props.prefix,
                style: getElementStyle('canvas', props)
            }),
            h('div', {
                key: props.prefix, 
                className: props.prefix,
                style: getElementStyle('notes-container', props)
            }, 
                props.items.map( data => !data.hidden?h( Note, { key: `note-${data.id}`,...props, data } ):h( NoteBubble, { key: `note-${data.id}`,...props, data } ) )
            )
        ]
    }

    
}