class Item < ApplicationRecord
    belongs_to :user
    belongs_to :category 
    belongs_to :city
    belongs_to :item_type
    # belongs_to :wishlist
    has_many :reviews
    has_one_attached :image_file
    validates :item_name, :item_type_id, :city_id , :category_id , :description , :user_id , presence: true
end
