class WishlistSerializer < ActiveModel::Serializer

  attributes :id, :name, :user_id, :item_id, :item_info


  def item_info
    @itemmm = Item.find_by(id: object.item_id)
    return @itemmm 
  end

  
end
