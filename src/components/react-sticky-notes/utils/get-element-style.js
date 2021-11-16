export function getElementStyle(nodeName, props, defaultStyle={}) {
    let style = defaultStyle;
    switch(nodeName){
        case "navbar":
            style = {
                ...defaultStyle,
                zIndex: 25,
            }
        break;
        case "button":
            style = {
                ...defaultStyle,
                padding: '0 1px',
                width: '2vmin'
            }
        break;
        case "container":
                style = { 
                    ...defaultStyle,
                    position: 'relative',
                    width: props.containerWidth, 
                    height: props.containerHeight, 
                    backgroundColor: props.backgroundColor
                }
        break;
        case "notes-container":
                style = { 
                    ...defaultStyle,
                    position: 'absolute',
                    left:0,
                    width: props.containerWidth, 
                    height: props.containerHeight, 
                    backgroundColor: "#524789"
                }
        break;
        case "canvas":
                style = { 
                    ...defaultStyle,
                    position: 'absolute',
                    left:0,
                    zIndex: 5,
                    width: props.canvasWidth, 
                    height: props.canvasHeight, 
                    backgroundColor: props.backgroundColor
                }
        break;
        case "note":
                style = {
                    ...defaultStyle,
                    position: 'absolute',
                    left: props.viewSize==="pageview"||props.viewSize==="fullscreen"?0:props.data.position?`${props.data.position.x}px`:0,
                    top: props.viewSize==="pageview"||props.viewSize==="fullscreen"?0:props.data.position?`${props.data.position.y}px`:0,
                    width: props.viewSize==="pageview"||props.viewSize==="fullscreen"?"100%":null,
                    height: props.viewSize==="pageview"||props.viewSize==="fullscreen"?"100%":null,
                    zIndex: 15
                }
                if(props.data.selected){
                    style.zIndex = 20;
                }
        break;
        case "note-body":
            style.width = props.viewSize==="pageview"||props.viewSize==="fullscreen"?"100%":props.noteWidth,
            style.height = props.viewSize==="pageview"||props.viewSize==="fullscreen"?"100%":props.noteHeight,
            style.backgroundColor= props.data.color,
            style.overflow = "auto";
            if(props.data.selected){
                style.minWidth = props.noteWidth,
                style.resize = "both";
            }
        break;
        case "note-input":
            style.height =  "100%";
        break;
        case "note-header":
            style.backgroundColor=props.data?props.data.color:'';
        break;
        case "note-minimized":
            style = {
                ...defaultStyle,
                backgroundColor: props.data.color,
                position: 'absolute',
                left: props.data.position?`${props.data.position.x}px`:0,
                top: props.data.position?`${props.data.position.y}px`:0,
                width: '10px',
                height: '10px'
            }
        break;
        case "note-maximized":
            style = {
                ...defaultStyle,
                backgroundColor: props.data.color,
                position: 'absolute',
                left: props.data.position?`${props.data.position.x}px`:0,
                top: props.data.position?`${props.data.position.y}px`:0,
                width: '10px',
                height: '10px'
            }
        break;
        case "note-menu":
            style.backgroundColor = "#ffffff";
            style.minHeight = '100%';
        break;
        case "note-color-selector":
            style = {
                ...defaultStyle,
                backgroundColor: props.colorCode
            }
        break;
        case "icon":
            style = {
                ...defaultStyle,
                verticalAlign: 'middle',
                width: '1em'
            }
        break;
    }
    return style;
}
