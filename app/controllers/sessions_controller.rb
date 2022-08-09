class SessionsController < ApplicationController
    before_action :authorize_user, except: [:login]

    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            render json: user, status: :ok
        else
            render json: { error: "Invalid Password and/or Username" },  status: :unauthorized
        end
    end

    def logout
        session.delete :current_user
    end 
end