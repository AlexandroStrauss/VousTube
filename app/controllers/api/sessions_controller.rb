class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:identifier], params[:user][:password])  
        if @user
            login(@user)
            render :show
        else
            render json: {error: "invalid username or password"}.to_json, status: 401
        end
    end

    def check #check if username/email exist in database
        identifier = params[:user][:identifier]
        if User.identifier_present?(identifier)
            render json: {text: identifier}, status: 200
        else
            render json: {error: "could not find user"}.to_json, status: 404
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
