class AddUserColumns < ActiveRecord::Migration[5.2]
  def change
      add_column :users, :email, :string
      add_column :users, :name, :string
      add_column :users, :password_digest, :string
      add_column :users, :auth_token, :string
      add_index :users, :email
  end
end
