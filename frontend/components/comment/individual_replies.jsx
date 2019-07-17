import React from 'react';
import CommentLikeInterfaceContainer from './comment_like_interface_container';
import { Route } from 'react-router-dom';

class IndividualReplies extends React.Component {
    constructor(props) {
        super(props);
    }

    userLogo(username) {
        if (username) {
            return (
                <div className="author-thumbnail-small" >
                    <p>{username[0].toUpperCase()}</p>

                </div>
            )
        } 
    }

    render () {
        const comment = this.props.comment
        const author = this.props.users[comment.author_id]

        return (
            <li key={comment.id} id="reply-container">
                <div id="reply-comment">
                    <div id="reply-author-logo">{this.userLogo(author.username)}</div>

                    <div id="all-comment-text">
                        <div id="comment-author-info">
                            <div id="comment-author-username">{author.username}</div>
                            <div id="comment-date">{comment.created_at}</div>
                        </div>
                        <div id="comment-body">{comment.body}</div>
                        <div id="like-reply">
                            
                            <Route render={props => <CommentLikeInterfaceContainer {...props} comment={comment} />} />
                            {/* <Route component={CommentLikeInterfaceContainer} props={{comment: comment}}/>  */}
                            {/* <button id="comment-like">
                                <i className="material-icons">thumb_up</i>
                            </button>

                            <button id="comment-dislike">
                                <i className="material-icons">thumb_down</i>
                            </button> */}

                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default IndividualReplies;