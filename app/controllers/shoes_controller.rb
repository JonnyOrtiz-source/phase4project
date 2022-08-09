class ShoesController < ApplicationController
    def index
        render json: Shoe.all, status: :ok
    end

    def show
        shoe = Shoe.find(params[:id])
        render json: shoe, status: :ok
    end 

    def create
        shoe = Shoe.create!(shoe_params)
        render json: shoe, status: :created
    end

    def update
        shoe = Shoe.find(params[:id])
        # byebug
        shoe.update!(shoe_params)
        render json: shoe, status: :created
    end

    def destroy
        shoe = Shoe.find(params[:id])
        shoe.destroy
        head :no_content
    end

    private 

    def shoe_params
        params.permit(:id,:shoe_name, :brand, :sex, :image_url,  :shoe_type_id)
    end 

end
