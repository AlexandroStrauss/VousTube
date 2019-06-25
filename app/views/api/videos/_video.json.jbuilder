json.video do
    json.extract! video, :title, :description, :thumbnail_img, :id, :author_id
    json.videoUrl url_for(video.video)
end

json.author do 
    json.partial! 'api/users/user', user: video.author
end

json.comments do 
    json.comments do 
        video.comments.each do |comment|
            json.set! comment.id do
                json.partial! 'api/comments/comment', comment: comment
            end
        end
    end

    json.authors do 
        video.comments.each do |comment|
            json.set! comment.author_id do 
                json.partial! 'api/users/user', user: comment.author
            end 
        end
    end
end
