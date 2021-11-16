import { h, getElementStyle, parseCSV } from './../utils';
import React, { Component, Fragment } from 'react';
export class UploadModal extends Component{
    constructor(){
        super();
        this.state = {
            error: '',
            response: null,
            contents: null
        }
        this.jsonInput = React.createRef();
    }
    componentDidMount(){
        this.handleResponse(null, null, null);
    }
    uploadFile = (e) => {
        const file = e.target.files[0];
        if(file){
            if( file.type==='image/png' || file.type==="image/jpg" || file.type==="image/jpeg" || file.type==="image/gif" ){
                const src = URL.createObjectURL(file);
                this.props.callbacks.addItem(null, {src});
                this.handleResponse(null, "Image Uploaded Successfully", "success")
                
            }else{
                this.handleResponse( "File type is not allowed. Please upload an Image file." );
            }
        }
    }
    handleResponse(err, contents, response){
        let error = err;
        if(response){
            if(response !== "success"){
                error = "Please upload a valid Image file."
                response = null;
                contents = null;
            }
        }
        this.setState({
            error, 
            contents:contents,
            response:response
        })
    }
    saveJSON = (e) => {
        const { response } = this.state;
        if(response){
            this.props.callbacks.saveJSON(e, response )
        }
    }
    render(){
        const { error, contents } = this.state; 
        const props = this.props;
        return h('div',{
            key: `${props.prefix}`,
            className:  `${props.prefix} ${props.prefix}--file-upload`
        },[
            contents?h('textarea',{
                key: 'file-upload--contents',
                className: `${props.prefix}--file-preview`,
                readOnly: true,
                defaultValue: contents
            }):null,
            h('div', {
                key: `${props.prefix}--file-drop`,
                className: `${props.prefix}--file-drop ${!contents?props.prefix+'--file-drop__cover':''}`
            }, [ 
                h('input', {
                    key: 'upload-button',
                    type: 'file',
                    id: `${props.prefix}--file-input`,
                    className: `${props.prefix}--file-input`,
                    accept: ".png,.jpg,.jpeg,.gif",
                    onChange: (e)=>this.uploadFile(e),
                    placeholder: 'upload file'
                }),
                h('p', {
                    key: 'upload-link',
                    className: `${props.prefix}--upload-link`,
                },[
                    h('label', {
                        key: "choose-a-file",
                        className: `${props.prefix}--file-label`,
                        htmlFor: `${props.prefix}--file-input`
                    }, contents?"Choose a another file":"Choose a file" ),
                    h('span', {
                        key: "drop-a-file" 
                    }, " or drag it here.")
                ]),
            ]),
            h('div',{
                key: 'file-upload--actions',
                className: `${props.prefix}--upload-actions`,
            },[
                error?h('p', {
                    key: 'upload-error',
                    className: `${props.prefix}--upload-error`,
                }, error ):null,
                h('button', {
                    key: 'file-upload--cancel',
                    className: `${props.prefix}--form-cancel`,
                    onClick: (e)=>props.callbacks.changeModal(e, null )
                }, 'Back to notes.' )
            ])
        ])
        
    }
}
