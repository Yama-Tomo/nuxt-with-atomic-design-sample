module Bff
  class SearchEmployees
    def initialize(params)
      @params = params
    end

    def execute
      result = ::SearchEmployees.new(@params).execute

      group_ids = result[:data_sets].map { |employee| employee.branches.map { |branch| branch.group.id } }.flatten.uniq
      is_specific_branches = group_ids.size == 1

      result.merge(
        groups: Group.all,
        branches: is_specific_branches ? Branch.where(group_id: group_ids.first) : [],
        sex: Sex.all,
        countries: Country.all,
      )
    end
  end
end
