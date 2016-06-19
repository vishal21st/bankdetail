class TestController < ApplicationController
  def index
    render json: Branch.all.to_json
  end  
end
