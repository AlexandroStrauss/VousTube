json.partial! 'api/videos/video', video: @video

@video.comments.includes(:author).each do |comment|
    json.comments do
        json.set! comment.id do
            json.partial! 'api/comments/comment', comment: comment
        end
    end

    json.authors do 
        json.set! comment.author.id do
            json.extract! comment.author, :id, :username
        end
    end
end

# movie = FFMPEG::Movie.new(@video)

# if !video.thumbnail_img
#     video.thumbnail_img = movie.screenshot("screenshot.png", { seek_time: 2, resolution: '200x120' }, preserve_aspect_ratio: :width)
# end
