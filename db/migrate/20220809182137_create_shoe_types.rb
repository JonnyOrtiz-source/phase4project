class CreateShoeTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :shoe_types do |t|
      t.string :shoe_type_name

      t.timestamps
    end
  end
end
