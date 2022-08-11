class Shoe < ApplicationRecord
  belongs_to :shoe_type
  has_many :user_shoes

  validates :shoe_name, presence: true
  validates :brand, presence: true
  validates :sex, presence: true, :inclusion => %w(Men Women Unisex)

end
