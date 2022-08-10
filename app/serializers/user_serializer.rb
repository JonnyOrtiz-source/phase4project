class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_many :shoes
  has_many :user_shoes
end
