class WtfBigint < ActiveRecord::Migration[5.2]
  def change
    add_column :configs, :light_on_time, :bigint
    add_column :configs, :light_off_time, :bigint
  end
end
