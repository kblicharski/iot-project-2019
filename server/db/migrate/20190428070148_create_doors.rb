class CreateDoors < ActiveRecord::Migration[5.2]
  def change
    create_table :doors do |t|
      t.boolean :open
      t.integer :crickets_fed, default: 0
      t.integer :crickets_to_feed
    end
  end
end
