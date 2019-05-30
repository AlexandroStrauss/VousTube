class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:identifier], params[:user][:password])  
        if @user
            login(@user)
            render :show
        else
            render json: ["Invalid credentials"], status: 401
        end
    end

    def check #check if username/email exist in database
        identifier = params[:user][:identifier]
        if User.identifier_present?(identifier)
            render json: {text: identifier}, status: 200
        else
            render json: ["Could not find username or email"], status: 404
        end
    end

    def destroy
        if logged_in?
            logout
            render json: ["logged out!"]
        else
            render json: ["Nobody logged in"], status: 404
        end
    end

end
