import React from 'react';

class IndividualReplies extends React.Component {
    constructor(props) {
        super(props);
        debugger
    }

    render () {
        debugger
        const comment = this.props.comment
        const author = this.props.users[comment.author_id]

        return (
            <li key={comment.id} id="reply-container">
                <div id="reply-comment">
                    {/* <div id="reply-author-logo">{this.props.userLogo(author.username)}</div> */}

                    <div id="all-comment-text">
                        <div id="comment-author-info">
                            <div id="comment-author-username">{author.username}</div>
                            <div id="comment-date">{comment.created_at}</div>
                        </div>
                        <div id="comment-body">{comment.body}</div>
                        <div id="like-reply">
                            <button id="like">
                                <i className="material-icons">thumb_up</i>
                            </button>

                            <button id="dislike">
                                <i className="material-icons">thumb_down</i>
                            </button>

                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default IndividualReplies;