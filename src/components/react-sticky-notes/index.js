import React, { Component } from 'react';
import reducer from './reducers/reducer';
import * as icons from './icons';
import { h, getColorCodes, getNotes, getUUID } from './utils';
import { NormalView, BubbleView, PageView, FullscreenView } from './views';
import { UploadModal } from './modals';
class ReactStickyNotes extends Component {
	static defaultProps = {
		useCSS: true,
		prefix: 'rs-notes',
		colorCodes: getColorCodes(),
		navbar: true,
		sessionKey: 'react-sticky-notes',
		noteWidth: 220,
		noteHeight: 220,
		containerWidth: '100%',
		containerHeight: '100%',
		icons,
		useMaterialIcons: true,

	}
	constructor(props) {
		super(props);
		this.state = {
			modal: null,
			viewSize: 'normalview',
			items: getNotes(props.colorCodes, props.notes),
			dragging: false,
		};

		// Stores the initial position of the cursor
		this.coord = { x: 0, y: 0 };

		// This is the flag that we are going to use to
		// trigger drawing
		this.paint = false;
	}

	// Resizes the canvas to the available size of the window.
	resize = () => {
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
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
		if (!this.state.dragging) {
			this.paint = true;
			this.getPosition(event);
		}

	}
	stopPainting = () => {
		this.paint = false;
	}

	sketch = (event) => {
		let { paint, ctx, coord } = this;
		if (!paint) return;
		ctx.beginPath();

		ctx.lineWidth = 5;

		// Sets the end of the lines drawn
		// to a round shape.
		ctx.lineCap = 'round';

		ctx.strokeStyle = 'green';

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

	componentDidMount() {
		// wait for the content of the window element
		// to load, then performs the operations.
		// This is considered best practice.
		this.canvas = document.querySelector('#canvas');

		// Context for the canvas for 2 dimensional operations
		this.ctx = canvas.getContext('2d');

		this.resize(); // Resizes the canvas once the window loads
		document.addEventListener('mousedown', this.startPainting);
		document.addEventListener('mouseup', this.stopPainting);
		document.addEventListener('mousemove', this.sketch);
		window.addEventListener('resize', this.resize);



		if (this.props.useCSS) {
			require('./index.scss');
		}
		if (this.props.useMaterialIcons) {
			const stylesheet = document.createElement('link');
			stylesheet.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
			stylesheet.rel = "stylesheet";
			stylesheet.id = "material-icons-css";
			if (!document.getElementById('material-icons-css')) {
				document.head.appendChild(stylesheet);
			}
		}
	}
	dispatch = (options) => {
		let { type, payload } = options;
		if (this.props.onBeforeChange) {
			payload = this.props.onBeforeChange(type, payload, [...this.state.items])
		}
		this.setState(
			reducer(this.state, { type, payload }),
			() => {
				if (this.props.sessionKey) {
					localStorage.setItem(this.props.sessionKey, JSON.stringify(this.state.items));
				}
				if (this.props.onChange) {
					this.props.onChange(type, payload, [...this.state.items])
				}
			}
		)
	}
	getColor() {
		return this.props.colorCodes[Math.floor(Math.random() * this.props.colorCodes.length)];
	}
	addItem = (e, data) => {
		const { items } = this.state;
		const index = data ? items.findIndex(item => item.id === data.id) + 1 : items.length;
		this.dispatch({
			type: 'add',
			payload: {
				index,
				data: {
					id: getUUID(),
					color: this.getColor(),
					text: '',
					selected: true,
					position: {
						x: (data && data.position) ? Math.max(data.position.x - 10, 0) : 0,
						y: (data && data.position) ? Math.max(data.position.y - 10, 0) : 0
					}
				}
			}
		});
	}
	toggleDragging = (e, data) => {
		this.dispatch({
			type: 'toggledragging',
			payload: {
				data
			}
		});

	}
	updateItem = (e, data) => {
		this.dispatch({
			type: 'update',
			payload: {
				data
			}
		});
	}
	deleteItem = (e, data) => {
		this.dispatch({
			type: 'delete',
			payload: {
				data
			}
		});
	}
	changeView = (e) => {
		this.dispatch({
			type: 'changeview'
		});
	}
	changeModal = (e, modal) => {
		this.dispatch({
			type: 'changemodal',
			payload: {
				modal
			}
		});
	}
	saveJSON = (e, json) => {
		this.dispatch({
			type: 'import',
			payload: {
				items: getNotes(this.props.colorCodes, json)
			}
		});
	}
	render() {
		const { items, viewSize, modal } = this.state;
		let View = null;
		if (modal) {
			switch (modal) {
				case "upload":
					View = UploadModal
					break;
			}
		} else {
			switch (viewSize) {
				case "pageview":
					View = PageView
					break;
				case "bubbleview":
					View = BubbleView
					break;
				case "fullscreen":
					View = FullscreenView
					break;
				default:
					View = NormalView
					break;
			}
		}
		return h(View, {
			...this.props,
			items,
			icons: { ...icons, ...this.props.icons },
			viewSize,
			callbacks: {
				changeView: this.changeView,
				addItem: this.addItem,
				updateItem: this.updateItem,
				deleteItem: this.deleteItem,
				changeModal: this.changeModal,
				saveJSON: this.saveJSON,
				toggleDragging: this.toggleDragging
			}
		})
	}

}
export default ReactStickyNotes;
