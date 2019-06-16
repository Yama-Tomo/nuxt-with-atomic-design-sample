class BranchesController < ActionController::Base
  def index
    result = SearchBranches.new(params).execute

    render :json => result[:data_sets].map { |row| row.slice(:id, :name) }
  end
end
