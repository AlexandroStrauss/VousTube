json.video do
    json.extract! video, :title, :description, :thumbnail_img, :id, :author_id
    json.videoUrl url_for(video.video)
end

json.author do 
    json.partial! 'api/users/user', user: video.author
end
