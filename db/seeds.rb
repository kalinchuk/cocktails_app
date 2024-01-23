# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

drinks = JSON.parse(File.read(Rails.root.join('db/cocktail_recipes.json')))
drinks.each do |drink_attr|
  category = Category.find_or_create_by!(name: drink_attr['category'])
  drink = Drink.create!(
    drink_attr
      .slice('name', 'container', 'instructions')
      .merge(category: category, image_url: drink_attr['image'])
  )
  drink_attr['ingredients'].each do |ingredient_attr|
    drink.ingredients.create!(ingredient_attr)
  end
end