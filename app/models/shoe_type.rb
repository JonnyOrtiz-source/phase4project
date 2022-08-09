class ShoeType < ApplicationRecord
    has_one :shoe

    validates :shoe_type_name, presence: true
end
