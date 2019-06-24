import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

class CommentIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            topClicked: false,
        }

        this.update = this.update.bind(this);
        this.showCommentButtons = this.showCommentButtons.bind(this);
        this.redirectIfNotLoggedIn = this.redirectIfNotLoggedIn.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    update(field) {
        return(e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    redirectIfNotLoggedIn () {
        if (!this.props.currentUser) {
            this.props.history.push('/login')
        }

    }
    
    showCommentButtons () {
        this.redirectIfNotLoggedIn();
        if(!this.state.topClicked) {
            this.setState({
                topClicked: true
            })
        }
    }

    userLogo () {
        if (this.props.currentUser) {
            return (
                <div className="author-thumbnail" >
                    <p>{this.props.currentUser.username[0].toUpperCase()}</p> 
                    
                </div>

            )
        } else {
            return (
                <div className="nouser-icon">
                    <i className="material-icons">account_circle</i>
                </div>
            )
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var videoId = this.props.location.pathname.split('/');
        videoId = parseInt(videoId[videoId.length - 1])
        const body = this.state.body;
        const comment = merge({}, {body: body, video_id: videoId})

        this.props.createComment(comment);
    }

    cancelComment () {
        this.setState({ body: '', topClicked: false});
    }

    render () {

        return (
            <div className="top-comment-form">
                <div className="text-container">
                    {this.userLogo()}
                    <input type="text" placeholder="Add a public comment..."
                        id="top-comment-text" 
                        onClick={this.state.topClicked ? null : this.showCommentButtons} 
                        onKeyPress={null}
                        // value={this.state.body}

                        onChange={this.update("body")}
                    />

                    {/* <label for="top-comment-text">
                        Add a public comment...
                    </label> */}

                </div>
                    <div className={this.state.topClicked ? "comment-buttons" : "comment-buttons-hidden"}>
                        <button id="comment-cancel" 
                        onClick={this.cancelComment}
                        >
                            CANCEL
                        </button>

                    <input type="submit" id={this.state.body === '' ? "comment-submit" : "comment-submit-blue"}
                    onClick={this.state.body === '' ? null : this.handleSubmit} value="COMMENT"> 
                            
                        </input>
                    </div>


            </div>
        )
    }
}

export default CommentIndex;