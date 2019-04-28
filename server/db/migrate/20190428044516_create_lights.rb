class CreateLights < ActiveRecord::Migration[5.2]
  def change
    create_table :lights do |t|
      t.boolean :on, default: false
      t.timestamps
    end
  end
end
