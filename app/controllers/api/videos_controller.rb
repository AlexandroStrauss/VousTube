class Api::VideosController < ApplicationController
    def show
        @video = Video.find(params[:id])
        render :show
    end

    def create
        debugger
        @video = Video.new(video_params)
        @video.author_id = current_user.id
        if @video.save
            render :show
        else
            render json: @video.errors.full_messages
        end
    end

    def index
        @videos = Video.all.includes(:author)
        # render :index
    end

    # def increment
    #     @videoview = VideoView.where(user_id: current_user, video_id: params[:id]).first_or_create
    #     @videoview.increment!(:count)
    # end


    private
    def video_params
        params.require(:video).permit(:title, :description, :video, thumbnails: [])
    end
end