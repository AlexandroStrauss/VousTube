class Video < ApplicationRecord
    validates :title, :description, presence: true

    validate :ensure_video

    belongs_to :author, 
        primary_key: :id, 
        foreign_key: :author_id,
        class_name: :User
    has_one_attached :video


    def ensure_video
        unless self.video.attached?
            errors[:video] << "no video attached"
        end
    end
end