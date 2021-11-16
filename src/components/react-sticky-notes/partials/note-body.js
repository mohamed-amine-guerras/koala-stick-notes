import { h, getElementStyle } from './../utils';
import NoteText from './note-text';
import NoteMenu from './note-menu';
export default function NoteBody(props) {
    const { data, prefix, callbacks } = props;
    const childs = [];
    if (data.src) {
        childs.push(h('img', {
            key: 'note-image',
            src: data.src,
            width: '100%',
            height: 'auto'
        }
        ));
    }
    if (data.menu) {
        childs.push(h(NoteMenu, {
            key: 'note-menu',
            ...props
        }));
    } else {
        childs.push(h(NoteText, {
            key: 'note-text',
            ...props
        }));
    }
    return h('div', {
        className: `${prefix}--note__body`,
        style: getElementStyle('note-body', props),
        onMouseOver: () => props.callbacks.toggleDragging(null, { dragging: true }),
        onMouseOut: () => props.callbacks.toggleDragging(null, { dragging: false })

    },
        childs
    )
}
