import React from 'react';
import VideoThumbnail from 'react-video-thumbnail';
import ReImg from 'reimg';

class VideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            videoFile: null,
            videoUrl: null,
            images: [],
            defaultThumb: null,
            imageFile: null,
            imageUrl: null,
            firstPage: true,
            videoReady: false,
            uploadProgress: 0,
            titleError: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleImageFile = this.handleImageFile.bind(this);
        this.twoPages = this.twoPages.bind(this);
        this.renderThumbnail = this.renderThumbnail.bind(this);
        this.canvasRef = React.createRef();
        this.videoRef = React.createRef();
    }

    //as user types in video title or description, this changes relevant value in state
    update(field) {
        return(e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    //handle video file submission
    handleFile(e) {
        this.setState({ firstPage: false })

        // var xhr = new XMLHttpRequest();
        // xhr.upload.addEventListener("progress", function (e) {
        //     var pc = parseInt(100 - (e.loaded / e.total * 100));
        //     this.setState({uploadProgress: pc})
        // }, false);

        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({
                videoFile: file, videoReady: true, videoUrl: URL.createObjectURL(file)})
        }
        if (file) {
            fileReader.readAsDataURL(file);
        }

    }

    // progressHandler(e) {
    //     var percent = (event.loaded / event.total) * 100;
    //     this.setState({ uploadProgress: Math.round(percent)}) 
    // }

    //self-explanatory
    handleImageFile(file) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {            
            this.setState({ imageFile: file, imageUrl: fileReader.result})
        }
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    //upon clicking "publish"...
    handleSubmit(e) {
        e.preventDefault();

        debugger
        //will not upload if there is no title
        if (this.state.title === "") {
            this.setState({titleError: true})
        } else {
            const formData = new FormData();
            formData.append('video[title]', this.state.title)
            formData.append('video[description]', this.state.description)
            if (this.state.videoFile) {
                formData.append('video[video]', this.state.videoFile)
            }

            //technically the user can upload many images for a thumbnail
            //(I found this was easier to work with)
            //but only the first one they chose will be used
            if (this.state.images[0]) {
                formData.append('video[thumbnails][]', this.state.images[0])
            } else {
                formData.append('video[thumbnails][]', this.state.defaultThumb)

                // var thumb = reImg.fromCanvas(this.refs.canvas)

                // var thumb = this.state.defaultThumb.split(',')[1];

                // var thumb_blob = new Blob([window.atob(thumb)], { type: 'image/png', encoding: 'utf-8' });

                // var fr = new FileReader();
                // // fr.onload = function (oFREvent) {
                // //     var v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
                // //     v = atob(v);
                // //     var good_b64 = btoa(decodeURIComponent(escape(v)));
                // //     document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
                // // };
                // // var defaultThumb = fr.readAsDataURL(thumb_blob)

                // formData.append('video[thumbnails][]', fr.readAsText(thumb_blob, 'utf-8'))
            }
            $.ajax({
                url: '/api/videos',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false
            }).then(
                response => {
                    debugger
                    //redirects to newly-uploaded video!
                    this.props.history.push(`/videos/${response.video.id}`)            },
            )
        }
    }

    renderThumbnail () {
        const vid = this.videoRef.current
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d");

        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)

        const snapshot = reImg.fromCanvas(canvas).toPng();
        this.setState({defaultThumb: snapshot})

        // debugger
        // vid.addEventListener('load', () => {
        //     ctx.moveTo(0, 0);
        //     ctx.lineTo(200, 100);
        //     ctx.stroke();

        //     debugger
        //     ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)
        // })


        // if (this.state.videoUrl) {
        //     const canvas = this.refs.thumb
        //     const ctx = canvas.getContext("2d")
        //     const vid = this.refs.vid

        //     vid.onload = () => {
        //         const canvas = this.refs.thumb
        //         const ctx = canvas.getContext("2d")

        //         ctx.drawImage(vid, 0, 0)
        //     }
        // }

    }

    // titleErrors() {
    //     if (this.state.title === "" )
    // }

    //the video form functions across two distinct pages depending on whether or not
    //a video has been uploaded; this switches between them
    twoPages() {
        if(this.state.firstPage === true) {
            return (
                // <div className="vid-form-background">
                    <div className="upload-form">

                        <label>
                        <i className="material-icons">cloud_upload</i>

                            Select file to upload
                            <p>Or drag and drop video files</p>
                            <input type="file"
                                onChange={this.handleFile}
                                accept="video/*" />
                        </label>
                    </div>
                    // </div>
            )
        } else {
            if (this.state.images[0]) {
                this.handleImageFile(this.state.images[0])
            }

            // var preview;
            //     thumb = (<VideoThumbnail
            //         videoUrl={this.state.videoUrl}
            //         thumbnailHandler={(thumbnail) => this.setState({ defaultThumb: thumbnail })}
            //     />)
            // }

            var thumb;
            if (this.state.videoUrl) {
                thumb = (
                <>
                    <video ref={this.videoRef} src={this.state.videoUrl} controls={false} className="hidden" onCanPlay={this.renderThumbnail}/>
                    <canvas ref={this.canvasRef} width={196} height={100}></canvas>
                </>
                )
            }

            // const vid = this.refs.vid
            debugger

            // if (vid) {
            //     vid.onload = () => {
            //         const canvas = this.refs.thumb
            //         const ctx = canvas.getContext("2d")

            //         ctx.drawImage(vid, 0, 0)
            //     }
            // }

            const preview = this.state.imageUrl ? <img src={this.state.imageUrl} /> : thumb

            const previewText = this.state.imageUrl ? "Your thumbnail" : "Default thumbnail"
            
            return (
                <div className="vid-form">
                    <div className="thumbnail-sidebar">
                        {preview}

                        <div className="previewTxt">
                            {previewText}
                        </div>

                        {/* <div className="hidden">
                        {thumb}
                        </div> */}
                    </div>

                    <div className="main-column">
                        <div className="progress-bar">
                            
                        </div>
                    <form className="video-form">
                        <input type="text" id="title" placeholder="Title" value={this.state.title} onChange={this.update('title')}>
                        </input>

                        {this.state.titleError ? <div className="title-error">Need a title</div>: <></>}

                        <label htmlFor="description" >
                            <textarea id="description" placeholder="Description" name="" cols="30" rows="10" value={this.state.description} onChange={this.update('description')}>

                            </textarea>
                        </label>

                        <label>Select a thumbnail for your video
                            <p>If you don't, it will be given a default thumbnail</p>
                            <input type="file"
                                onChange={e => this.setState({ images: e.target.files })}
                                accept="image/*" 
                                multiple/>
                        </label>

                        <input type="submit" className="submit" onClick={this.handleSubmit} value="Publish" />
                    </form>
                </div>
                </div>
            )
        }
    }
    
    render () {
        return (
            <div className="vid-form-background">
                {this.twoPages()}
            </div>
        )
    }
}

export default VideoForm;