# frozen_string_literal: true

class Branch < ApplicationRecord
  has_many :employee_branches
  has_many :employees, through: :employee_branches
  belongs_to :group
end
