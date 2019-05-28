class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else 
            render json: {error: @user.errors.full_messages}.to_json, status: 401
        end
    end

    def user_params 
        params.require(:users).permit(:username, :email, :password, :verified)
    end
end
