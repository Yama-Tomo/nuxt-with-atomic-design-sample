# frozen_string_literal: true

class BranchGroup < ApplicationRecord
  belongs_to :branch
  belongs_to :group
end
