json.video do
    json.extract! video, :title, :description, :views, :id, :author_id, :created_at
    json.videoUrl url_for(video.video)
    json.created_year video.created_at.year
    json.created_month video.created_at.month
    json.created_day video.created_at.day
    # json.readableTime video.created_at.strftime("%B %d %Y")}
end

json.author do 
    json.partial! 'api/users/user', user: video.author
end

# json.likes do 
#     video.likes.each do |like|
#         json.set! like.id do 
#             json.partial! 'api/likes/like', like: like
#         end
#     end
# end

json.comments do 
    json.comments do 
        video.comments.each do |comment|
            comment.likes.each do |like|
                 json.partial! 'api/likes/like', like: like
            end
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

    # json.likes do 
    #     video.comments.each do |comment|
    #         comment.likes.each do |like|
    #             json.set! like.id do 
    #                 json.partial! 'api/likes/like', like: like
    #             end
    #         end
    #     end
    # end
end
