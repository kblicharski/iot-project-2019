class AddTimeSchedulingToConfig < ActiveRecord::Migration[5.2]
  def change
    add_column :configs, :light_on_time, :integer, default: 0
    add_column :configs, :light_off_time, :integer, default: 0
  end
end
