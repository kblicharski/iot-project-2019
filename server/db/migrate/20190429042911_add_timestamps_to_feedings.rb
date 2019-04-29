class AddTimestampsToFeedings < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :doors, null: true
    fake_time = DateTime.new(2000, 1, 1)
    Door.update_all(created_at: fake_time, updated_at: fake_time)
    change_column_null :doors, :created_at, false
    change_column_null :doors, :updated_at, false
  end
end
