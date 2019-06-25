class Api::CommentsController < ApplicationController 


    def new 
        @comment = Comment.new(video_id: params[:video_id])\
    end
    
    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id

        if @comment.save 
            render :show
            # redirect_to "/api/videos/#{@comment.video_id}" 
        else
            render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end

    def index 
        @comments = Comment.all.select do |comment|
            comment.video_id = params[:video_id]
            comment.includes(:author)
            comment.includes(:child_comments)
        end

        render :index
    end

    def show
        @comment = Comment.find(params[:id])
        @comment.includes(:author)
        @comment.includes(:child_comments)
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :video_id, :parent_comment_id)
    end

end