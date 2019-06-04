class User < ApplicationRecord 
    validates :username, :email, :session_token, :password_digest, presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: {minimum: 8, allow_nil: true}

    attr_reader :password

    has_many :authored_videos,
        primary_key: :id, 
        foreign_key: :author_id,
        class_name: :Video

    after_initialize :ensure_session_token

    def self.find_by_credentials(identifier, password)
        user = User.find_by(username: identifier)
        user ||= User.find_by(email: identifier)
        return nil unless user && user.is_password?(password)
        user
    end

    def self.identifier_present?(identifier)
        user = User.find_by(username: identifier)
        user ||= User.find_by(email: identifier)
        !!user
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def reset_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end
end