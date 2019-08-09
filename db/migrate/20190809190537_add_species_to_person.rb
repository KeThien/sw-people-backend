class AddSpeciesToPerson < ActiveRecord::Migration[5.2]
  def change
    remove_column :people, :species
    add_reference :people, :species, foreign_key: true
  end
end
