class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :shoe_name, :brand, :sex, :image_url, :shoe_type_id
  has_one :shoe_type
end
