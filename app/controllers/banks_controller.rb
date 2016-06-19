class BanksController < ApplicationController
  def index
    render json: Bank.all.to_json
  end  
end
