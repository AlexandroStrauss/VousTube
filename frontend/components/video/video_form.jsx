import React from 'react';

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
            descriptionError: false,
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
        e.preventDefault();

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

        //will not upload if there is no title
        if (this.state.title === "" || this.state.description === "") {
            if (this.state.title === "") 
                {this.setState({titleError: true})}
            if (this.state.description === "") {
                this.setState({descriptionError: true})
            }
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
            }
            $.ajax({
                url: '/api/videos',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false
            }).then(
                response => {
                    //redirects to newly-uploaded video!
                    this.props.history.push(`/videos/${response.video.id}`)            },
            )
        }
    }

    //this lets us both put a preview thumbnail on the page (replaced by any custom thumb the user uploads)
    //and save that thumb in a format that can be easily stored on the S3 server
    renderThumbnail () {
        const vid = this.videoRef.current
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d");

        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)

        var dataurl = canvas.toDataURL();

        //convert from 64-bit to 8-bit and make a File object from the results
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], { type: mime });

        this.setState({ defaultThumb: file})
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
                            {/* <p>Or drag and drop video files</p> */}
                            <p>Any MP4 file will do</p>
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


            const preview = this.state.imageUrl ? <img src={this.state.imageUrl} /> : thumb

            const previewText = this.state.imageUrl ? "Your thumbnail" : "Default thumbnail"
            
            return (
                <div className="vid-form">
                    <div className="thumbnail-sidebar">
                        {preview}

                        <div className="previewTxt">
                            {previewText}
                        </div>

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
                            {this.state.titleError ? <div className="title-error">Need a description</div> : <></>}


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