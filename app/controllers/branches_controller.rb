class BranchesController < ApplicationController
  def index
    begin
      branches = Branch.where(["bank_id = ? and city = ?", params[:bank_id],params[:city]])
      render json: branches.to_json, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end  
  end  

  def getBranchesByBank
    begin
      branches = Branch.where(["bank_id = ? and city = ?", params[:bank_id],params[:city]])
      render json: branches.to_json, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end  
  end

  def getCitiesByBank
    begin
      cities = Branch.where(["bank_id = ?", params[:bank_id]]).select(:city).map(&:city).uniq
      # cities = Branch.where(["bank_id = ?", params[:bank_id]]).select(:city).uniq
      render json: cities.to_json, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end  
  end

end
