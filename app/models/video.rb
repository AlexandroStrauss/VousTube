class Video < ApplicationRecord
    validates :title, :description, presence: true

    validate :ensure_video

    belongs_to :author, 
        primary_key: :id, 
        foreign_key: :author_id,
        class_name: :User

    has_many :comments

    has_many :likes, as :likeable

    
    has_one_attached :video
    has_many_attached :thumbnails

    def ensure_video
        unless self.video.attached?
            errors[:video] << "no video attached"
        end
    end


    # def change
    #     add_column :video_views, :count, :integer, default: 0
    # end

end