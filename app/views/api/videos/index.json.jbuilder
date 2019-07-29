@videos.each do |video| 
    json.videos do 
        json.set! video.id do
            json.extract! video, :title, :description, :id, :views, :author_id
            json.videoUrl url_for(video.video)
            json.time_since_creation Time.now - video.created_at
            
            if (video.thumbnails[0]) 
                json.imageUrl url_for(video.thumbnails[0])
            else
                json.imageUrl false
                # if (video.default_thumb)
                #     json.default_thumb video.default_thumb
                # else
                #     json.default_thumb false
                # end
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