# frozen_string_literal: true

class Employee < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  has_many :employee_branches
  has_many :branches, through: :employee_branches
  has_many :groups, through: :branches
  accepts_nested_attributes_for :employee_branches

  belongs_to :sex
  belongs_to :country
end
