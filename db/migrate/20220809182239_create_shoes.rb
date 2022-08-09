class CreateShoes < ActiveRecord::Migration[6.1]
  def change
    create_table :shoes do |t|
      t.string :shoe_name
      t.string :brand
      t.string :sex
      t.string :image_url
      t.belongs_to :shoe_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
