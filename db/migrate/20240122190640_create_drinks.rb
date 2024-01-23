class CreateDrinks < ActiveRecord::Migration[7.1]
  def change
    create_table :drinks do |t|
      t.references :category, null: false, foreign_key: true
      t.string :name
      t.string :container
      t.text :instructions
      t.text :image_url

      t.timestamps
    end
  end
end
