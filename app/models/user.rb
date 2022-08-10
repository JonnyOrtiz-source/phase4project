class User < ApplicationRecord
    has_secure_password

    has_many :user_shoes
    has_many :shoes, through: :user_shoes

    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
end
