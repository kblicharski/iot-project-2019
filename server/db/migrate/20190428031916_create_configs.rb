class CreateConfigs < ActiveRecord::Migration[5.2]
  def change
    create_table :configs do |t|
      t.float :high_temp
      t.float :low_temp
      t.float :high_humidity
      t.float :low_humidity
      t.integer :crickets_to_feed
      t.timestamps
    end
  end
end
