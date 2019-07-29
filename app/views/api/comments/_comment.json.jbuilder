json.extract! comment, :body, :id, :author_id, :child_comments, :video_id, :parent_comment_id, :created_at

json.time_since_creation Time.now - comment.created_at
