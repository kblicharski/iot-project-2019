class CreateHumidities < ActiveRecord::Migration[5.2]
  def change
    create_table :humidities do |t|
      t.float :value
      t.string :description
      t.timestamps
    end
  end
end
