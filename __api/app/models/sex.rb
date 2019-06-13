# frozen_string_literal: true

class Sex < ActiveHash::Base
  self.data = [
    { id: 1, name: :male },
    { id: 2, name: :female },
    { id: 3, name: :other },
  ]
end
