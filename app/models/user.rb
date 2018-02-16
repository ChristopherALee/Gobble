# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  username               :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  last_visited_channel   :string           default("")
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def will_save_change_to_email?
    false
  end

  has_many :memberships,
    class_name: 'Membership',
    foreign_key: :member_id

  has_many :channels,
    through: :memberships,
    source: :channel

  has_many :messages,
    class_name: 'Message',
    foreign_key: :author_id

  # validates :username, presence: { message: 'Please enter a username.'}, uniqueness: { message: 'This username has already been taken.'}
  # validates :password_digest, :session_token, presence: true
  # validates :session_token, uniqueness: true
  # validates :password, length: { minimum: 6, allow_nil: true, message: 'Password must be a minimum of 6 characters.' }
  #
  # attr_reader :password
  #
  # after_initialize :ensure_session_token
  #
  # def self.find_by_credentials(username, password)
  #   @user = User.find_by(username: username)
  #   (@user && @user.is_password?(password)) ? @user : nil
  # end
  #
  # def password=(password)
  #   @password = password
  #   self.password_digest = BCrypt::Password.create(password)
  # end
  #
  # def is_password?(password)
  #   BCrypt::Password.new(self.password_digest).is_password?(password)
  # end
  #
  # def self.generate_session_token
  #   SecureRandom.urlsafe_base64
  # end
  #
  # def reset_session_token!
  #   self.session_token = User.generate_session_token
  #   self.save!
  #   self.session_token
  # end
  #
  # def ensure_session_token
  #   self.session_token ||= User.generate_session_token
  # end
end
