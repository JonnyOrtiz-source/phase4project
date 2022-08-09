class UserShoesController < ApplicationController
    def index
        render json: UserShoe.all, status: :ok
    end

    def create
        user_shoe = UserShoe.create!(user_shoe_params)
        render json: user_shoe, status: :created
    end 

    private

    def user_shoe_params
        params.permit(:purchase_date, :color, :size, :user_id, :shoe_id)
    end

end
