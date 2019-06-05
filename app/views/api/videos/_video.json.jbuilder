
json.extract! video, :title, :description, :thumbnail_img, :video, :id, :author_id, :author

json.videoUrl url_for(video.video)
