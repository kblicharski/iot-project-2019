class ChangeToBigint < ActiveRecord::Migration[5.2]
  def change
    remove_column :configs, :light_off_time
    remove_column :configs, :light_on_time
  end
end
