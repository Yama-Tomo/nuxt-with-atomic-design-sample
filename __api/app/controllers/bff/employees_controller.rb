module Bff
  class EmployeesController < ActionController::Base
    def index
      result = Bff::SearchEmployees.new(params).execute

      data_sets = result[:data_sets].map do |row|
        belongs = row.branches.reduce({}) do |memo, branch|
          memo[branch.group.id] ||= { group: branch.group.name, branches: [] }
          memo[branch.group.id][:branches] << branch.name
          memo
        end.map { |(_k, v)| v }

        {
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          sex: row.sex.id,
          country: row.country.id,
          belongs: belongs,
        }
      end

      render :json => {
        data_sets: data_sets,
        total_count: result[:total_count],
        groups: result[:groups].map { |g| g.slice(:id, :name) },
        branches: result[:branches].map { |g| g.slice(:id, :name) },
        sex: result[:sex].map { |sex| sex.attributes.slice(:id, :name) },
        countries: result[:countries].map { |country| country.attributes.slice(:id, :name) },
      }
    end
  end
end
