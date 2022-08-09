class ShoeTypesController < ApplicationController
    def index
        render json: ShoeType.all, status: :ok
    end
end
