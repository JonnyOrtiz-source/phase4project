class Shoe < ApplicationRecord
  belongs_to :shoe_type

  validates :shoe_name, presence: true
  validates :brand, presence: true
  validates :sex, presence: true, :inclusion => %w(Men Women Unisex)

end
