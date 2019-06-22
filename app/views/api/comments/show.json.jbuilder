json.comment do
  json.partial! '/api/comments/comment', comment: @comment
  json.author @comment.author.username
end

# json.author do
#   json.partial! '/api/users/user', user: @comment.author
# end
