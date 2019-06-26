class Comment < ApplicationRecord
    validates :author_id, :video_id, :body, presence: true

    belongs_to :video

    belongs_to :author,
        primary_key: :id, 
        foreign_key: :author_id,
        class_name: :User

    has_many :child_comments,
        primary_key: :id,
        foreign_key: :parent_comment_id,
        class_name: :Comment

    belongs_to :parent_comment, 
        primary_key: :id,
        foreign_key: :parent_comment_id,
        class_name: :Comment, 
        optional: true
end