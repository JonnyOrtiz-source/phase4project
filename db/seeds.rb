# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding"
ShoeType.create(shoe_type_name: "Sneakers")
ShoeType.create(shoe_type_name: "Dress")
ShoeType.create(shoe_type_name: "Clogs")
ShoeType.create(shoe_type_name: "Sandals")
ShoeType.create(shoe_type_name: "Wedges")
ShoeType.create(shoe_type_name: "Boots")
ShoeType.create(shoe_type_name: "Flats")
ShoeType.create(shoe_type_name: "Heels")
ShoeType.create(shoe_type_name: "Slippers")
ShoeType.create(shoe_type_name: "Boat Shoes")
ShoeType.create(shoe_type_name: "Oxfords")
puts "Done 🌻"