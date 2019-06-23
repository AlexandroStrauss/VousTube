json.video do
    json.extract! video, :title, :description, :thumbnail_img, :id, :author_id, :comments
    json.videoUrl url_for(video.video)
end

json.author do 
    json.partial! 'api/users/user', user: video.author
end

json.comments do 
    video.comments.each do |comment|
        json.partial! 'api/comments/comment', comment: comment
    end
end
