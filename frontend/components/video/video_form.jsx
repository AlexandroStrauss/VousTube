import React from 'react';

class VideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoFile = null,
            video = [],
            thumbUrl = null,
        }
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
        formData.append('video[thumbnail]', this.state.thumbnail_img)
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
        <form>
            <label for="title">
                <input type="text">

                </input>
            </label>

            <label for="description">
                <textarea name="" id="" cols="30" rows="10">

                </textarea>
            </label>


            <label>Choose A File...
                <input type="file" 
                    onChange={this.handleFile.bind(this)}
                />
            </label>


        </form>
    }
}