import React from 'react';

class VideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            // videoFile = null,
            // video = [],
            // thumbUrl = null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ videoFile: e.currentTarget.files[0], thumbUrl: fileReader.result })
        }
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video[title]', this.state.title)
        formData.append('video[description]', this.state.description)
        formData.append('video[video]', this.state.videoFile)
        // formData.append('video[thumbnail]', this.state.thumbUrl)
        $.ajax({
            url: '/api/videos',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false
        }).then(
            response => console.log(response.message),
            response => console.log(response.responseJSON),
        )
    }

    render () {
        return (
        <form>
            <label htmlFor="title">
                <input type="text" id="title" value={this.state.title}>

                </input>
            </label>

            <label htmlFor="description">
                <textarea id="description" name="" cols="30" rows="10" value={this.state.description}>

                </textarea>
            </label> 

            <label>Select file to upload
                <input type="file" 
                    onChange={this.handleFile}
                    accept="video/*"
                />
            </label>

            {/* <label>Choose A Thumbnail
                <input type="file"
                    onChange={this.handleFile.bind(this)}
                     accept="image/*"
                />
            </label> */}

            <input type="submit" onClick={this.handleSubmit} value="Upload" />
        </form>
        )
    }
}

export default VideoForm;