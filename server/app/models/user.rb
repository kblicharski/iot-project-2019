class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: { scope: :permission_level }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true

  before_save :downcase_fields

  def downcase_fields
    email.downcase!
  end

end
