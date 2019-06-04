import React from 'react';

class VideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            videoFile: null,
            video: [],
            thumbUrl: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }
    update(field) {
        return(e) => {
            this.setState({ [field]: e.target.value })
        }
    }
    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            // this.setState({ videoFile: e.currentTarget.files[0], thumbUrl: fileReader.result })
            this.setState({ videoFile: file})
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
        if (this.state.videoFile) {
            formData.append('video[video]', this.state.videoFile)
        }
        // formData.append('video[thumbnail]', this.state.thumbUrl)
        $.ajax({
            url: '/api/videos',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false
        }).then(
            this.props.history.push('/'),
            response => console.log(response.responseJSON),
        )
    }

    render () {
        return (
            <div className="vid-form-background">
            <div className="vid-form">
                <form className="video-form">
                    {/* <label htmlFor="title" placeholder="Title"> */}
                            <input type="text" id="title" placeholder="Title" value={this.state.title} onChange={this.update('title')}>

                        </input>
                    {/* </label> */}

                        {/* <div className={this.passwordShort() ? "floating-label-error" : "floating-label"}>
                            <input id="pwd" type={this.state.showPwd ? "text" : "password"} value={this.state.password} onChange={this.update('password')} />
                            <label for="pwd">Password</label>

                            {this.passwordError()}
                        </div> */}


                    <label htmlFor="description" >
                            <textarea id="description" placeholder="Description" name="" cols="30" rows="10" value={this.state.description} onChange={this.update('description')}>

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

                    <input type="submit" className="submit" onClick={this.handleSubmit} value="Publish" />
                </form>
            </div>
            </div>
        )
    }
}

export default VideoForm;