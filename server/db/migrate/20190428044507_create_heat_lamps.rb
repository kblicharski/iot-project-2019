class CreateHeatLamps < ActiveRecord::Migration[5.2]
  def change
    create_table :heat_lamps do |t|
      t.float :percentage, default: 0.0
      t.timestamps
    end
  end
end
