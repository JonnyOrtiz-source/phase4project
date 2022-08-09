class UsersController < ApplicationController
    before_action :authorize_user, except: [:create]
    
    def index
        render json: User.all, status: :ok
    end 

    def create
        user = User.create!(user_params)
        session[:current_user] = user.id
        render json: user, status: :created
    end 

    def show
        current_user = User.find_by(id: session[:current_user])
        render json: current_user
    end 

    private

    def user_params
        params.permit(:email, :password, :password_confirmation)
    end

end
