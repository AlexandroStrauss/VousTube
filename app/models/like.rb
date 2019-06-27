class Like < ApplicationRecord
    belongs_to :likeable, polymorphic: true
    
    validates :likeable_id, :likeable_type, :user_id, :value, presence: true
    validate :ensure_binary_values

    def ensure_binary_values
        unless self.value == 1 || self.value == -1
            errors[:like] << "invalid value"
        end
    end

end