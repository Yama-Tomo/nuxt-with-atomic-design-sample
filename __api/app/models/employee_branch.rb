# frozen_string_literal: true

class EmployeeBranch < ApplicationRecord
  belongs_to :employee
  belongs_to :branch
end
