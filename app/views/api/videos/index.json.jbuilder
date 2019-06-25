@videos.each do |video| 
    json.videos do 
        json.set! video.id do
            json.extract! video, :title, :description, :id, :author_id
            json.videoUrl url_for(video.video)
            
            if (video.thumbnails[0]) 
                json.imageUrl url_for(video.thumbnails[0])
            else
                json.imageUrl false
            end
        end
    end
end

@videos.each do |video|
    json.authors do
        json.set! video.author_id do 
            json.partial! 'api/users/user', user: video.author
        end
    end
end

# json.authors do
#     json.array! @videos do |video|
#         json.set! video.author_id do 
#             json.partial! 'api/users/user', user: video.author
#         end
#     end
# end


# json.array! @videos do |video.author|
#     json.video.author do
#         json.partial! 'api/users/user', user: video.author
#     end
# end


    # json.partial! 'api/videos/video', video: video, user: video.author
