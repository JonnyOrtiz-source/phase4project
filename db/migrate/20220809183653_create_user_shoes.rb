class CreateUserShoes < ActiveRecord::Migration[6.1]
  def change
    create_table :user_shoes do |t|
      t.string :purchase_date
      t.string :color
      t.float :size
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :shoe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
