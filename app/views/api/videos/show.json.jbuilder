# require 'streamio-ffmpeg'

json.partial! 'api/videos/video', video: @video

# movie = FFMPEG::Movie.new(@video)

# if !video.thumbnail_img
#     video.thumbnail_img = movie.screenshot("screenshot.png", { seek_time: 2, resolution: '200x120' }, preserve_aspect_ratio: :width)
# end
