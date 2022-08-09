class UserShoeSerializer < ActiveModel::Serializer
  attributes :id, :purchase_date, :color, :size, :shoe_id, :user_id
  # has_one :user
  # has_one :shoe
end
