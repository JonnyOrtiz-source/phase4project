class UserShoeSerializer < ActiveModel::Serializer
  attributes :id, :purchase_date, :color, :size, :shoe_id, :user_id, :shoe_name, :brand, :sex, :image_url, :shoe_type_id, :shoe_type_name
  # has_one :user
  # has_one :shoe

  def shoe_name
    object.shoe.shoe_name
  end
  def brand
    object.shoe.brand
  end
  def sex
    object.shoe.sex
  end
  def image_url
    object.shoe.image_url
  end
  def shoe_type_id
    object.shoe.shoe_type_id
  end
  def shoe_type_name
    object.shoe.shoe_type.shoe_type_name
  end

end
