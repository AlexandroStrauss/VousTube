class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :thumbnail_img
      t.integer :author_id, null: false

      t.timestamps
    end
    add_index :videos, :author_id

  end
end
