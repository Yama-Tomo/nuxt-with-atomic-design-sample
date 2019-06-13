# frozen_string_literal: true

class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string   :first_name,    null: false, default: ""
      t.string   :last_name,     null: false, default: ""
      t.integer  :sex_id,        null: false
      t.integer  :country_id,    null: false
      t.timestamp
    end

    create_table :employee_branches do |t|
      t.integer   :employee_id,   null: false
      t.integer   :branch_id,     null: false
      t.timestamps
    end
    add_index :employee_branches, [:employee_id, :branch_id], unique: true

    create_table :branches do |t|
      t.string   :name,       null: false, default: ""
      t.integer  :group_id,   null: false
      t.timestamps
    end

    create_table :groups do |t|
      t.string   :name,    null: false, default: ""
      t.timestamps
    end
  end
end
