class Api::CommentsController < ApplicationController 


    def new 
        @comment = Comment.new(video_id: params[:video_id])

    end
    
    def create
        @comment = current_user.comments.new(comment_params)

        if @comment.save 
            redirect_to video_url(@comment.video_id)
        else
            # render json: @comment.errors.full_messages, status: :unprocessable_entity
            debugger
            render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end

    def index 
        @comments = Comment.all.select do |comment|
            comment.video_id = params[:video_id]
        end

        render :index
    end

    def show
        @comment = Comment.find(params[:id])
        @comment.include(:child_comments)
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :video_id, :parent_comment_id)
    end

end