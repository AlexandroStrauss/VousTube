Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: :create
    resource :session, only: [:create, :destroy]
    post '/session/check', to: 'sessions#check'
    resources :videos, only: [:create, :show, :index] do 
      resources :comments, only: [:new, :create, :show, :index]
      resources :likes, only: [:create, :update, :destroy]
      # post :increment 
    end

    resources :comments do 
      resources :likes, only: [:create, :update, :destroy]
    end

  end

end
