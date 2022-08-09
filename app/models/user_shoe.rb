class UserShoe < ApplicationRecord
  belongs_to :user
  belongs_to :shoe

  delegate :formatted_time, to: :purchase_date
end
