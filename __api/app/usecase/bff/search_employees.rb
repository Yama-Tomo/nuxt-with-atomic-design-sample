module Bff
  class SearchEmployees
    def initialize(params)
      @params = params
    end

    def execute
      result = ::SearchEmployees.new(@params).execute

      result.merge(
        groups: Group.all,
        branches: @params[:group].present? ? Branch.where(group_id: @params[:group]) : [],
        sex: Sex.all,
        countries: Country.all,
      )
    end
  end
end
