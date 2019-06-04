class Api::VideosController < ApplicationController
    def show
        @video = Video.find(params[:id])
        render :show
    end

    def create
        @video = Video.new(video_params)
        @video.author_id = current_user.id
        debugger
        if @video.save 
            render json: {message: "success!"}
        else
            debugger
            render json: @video.errors.full_messages
        end
    end

    def index
        @videos = Video.all 
        render :index
    end

    def video_params
        params.require(:video).permit(:title, :description, :thumbnail_img, :videoFile)
    end
end