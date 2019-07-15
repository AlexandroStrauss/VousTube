class Api::LikesController < ApplicationController 
    def create
        @like = Like.new(like_params)
        @like.user_id = current_user.id
        if @like.save 
            render :show
        else 
            render json: @like.errors.full_messages
        end
    end

    def update 
        @like = Like.find(params[:id])
        @like.value = -@like.value
        if @like.save 
            render :show
        else 
            render json: @like.errors.full_messages
        end

    end

    def index 
        @likes = Like.all
    end

    def destroy
        debugger
        like = Like.find(params[:id])
        like.destroy
    end

    private
    def like_params
        params.require(:like).permit(:value, :likeable_id, :likeable_type)
    end

end