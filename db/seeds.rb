# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
FactoryGirl.define do
  factory :todo do
    title { Faker::Hipster.word }
    body { Faker::Hipster.sentence }
    done { Faker::Boolean.boolean }
  end
end

10.times do |i|
	FactoryGirl.create(:todo)
end
