class Message < ApplicationRecord
    belongs_to :user_sender, class_name: 'User', foreign_key: 'sender_id'
    belongs_to :user_receiver, class_name: 'User', foreign_key: 'user_id'


end
