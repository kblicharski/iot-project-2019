# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_28_070148) do

  create_table "configs", force: :cascade do |t|
    t.float "high_temp"
    t.float "low_temp"
    t.float "high_humidity"
    t.float "low_humidity"
    t.integer "crickets_to_feed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "doors", force: :cascade do |t|
    t.boolean "open", default: true
    t.integer "crickets_fed", default: 0
    t.string "status", default: "feeding"
  end

  create_table "heat_lamps", force: :cascade do |t|
    t.float "percentage", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "humidities", force: :cascade do |t|
    t.float "value"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lights", force: :cascade do |t|
    t.boolean "on", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "temperatures", force: :cascade do |t|
    t.float "value"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.string "auth_token"
    t.index ["email"], name: "index_users_on_email"
  end

end
