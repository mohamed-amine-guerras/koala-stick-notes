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
			canvasWidth: document.body.clientWidth,
			canvasHeight: document.body.clientHeight
		};

	}


	componentDidMount() {
		
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
					},
					src: data.src? data.src : null
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
	resizeCanvas = (e, data) => {
		this.dispatch({
			type: 'resize',
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
		const { items, viewSize, modal, canvasHeight, canvasWidth } = this.state;
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
			canvasHeight,
			canvasWidth,
			dragging: this.state.dragging,
			callbacks: {
				changeView: this.changeView,
				addItem: this.addItem,
				updateItem: this.updateItem,
				deleteItem: this.deleteItem,
				changeModal: this.changeModal,
				saveJSON: this.saveJSON,
				toggleDragging: this.toggleDragging,
				resizeCanvas: this.resizeCanvas
			}
		})
	}

}
export default ReactStickyNotes;
