class Api::VideosController < ApplicationController
    def show
        @video = Video.find(params[:id])
        render :show
    end

    def video_params
        params.require(:video).permit(:title, :description, :thumbnail_img)
    end
end