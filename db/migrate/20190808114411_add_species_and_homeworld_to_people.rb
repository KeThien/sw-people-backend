class AddSpeciesAndHomeworldToPeople < ActiveRecord::Migration[5.2]
  def change
    add_column :people, :species, :string
    add_column :people, :homeworld, :string
  end
end
