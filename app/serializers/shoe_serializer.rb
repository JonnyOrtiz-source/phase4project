class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :shoe_name, :brand, :sex, :image_url, :shoe_type_id, :shoe_type_name

  def shoe_type_name
    ShoeType.find(object.shoe_type_id).shoe_type_name
  end

end
