# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150828211505) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "major_sections", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "vehicle_id"
  end

  create_table "minor_sections", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "major_section_id"
    t.integer  "vehicle_id"
  end

  create_table "selections", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "default"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "spec_id"
  end

  create_table "specs", force: true do |t|
    t.string   "name"
    t.string   "spec_type"
    t.text     "description"
    t.string   "range_min"
    t.string   "range_max"
    t.string   "range_interval"
    t.string   "range_default"
    t.string   "unit_type"
    t.string   "unit_of_measure"
    t.string   "uom_abbreviation"
    t.string   "default_precision"
    t.text     "comments"
    t.integer  "vehicle_id"
    t.integer  "major_section_id"
    t.integer  "minor_section_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "range_default_multi"
    t.string   "fraction_base"
  end

  create_table "vehicles", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
