class CreateDoors < ActiveRecord::Migration[5.2]
  def change
    create_table :doors do |t|
      t.boolean :open, default: true
      t.integer :crickets_fed, default: 0
      t.string :status, default: 'feeding'
    end
  end
end
