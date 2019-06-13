# frozen_string_literal: true

class Country < ActiveHash::Base
  self.data = [
    { id: 1, name: :Japan },
    { id: 2, name: :US },
    { id: 3, name: :France },
  ]
end
