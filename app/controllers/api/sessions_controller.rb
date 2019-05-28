class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login(@user)
            render :show
        else
            render json: {error: "invalid username or password"}.to_json, status: 401
        end
    end

    def destroy
        if logged_in?
            logout
            render json: {text: "logged out!"}.to_json
        else
            render json: {error: "nobody logged in"}.to_json, status: 404
        end
    end

end
