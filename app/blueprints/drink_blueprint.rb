class DrinkBlueprint < Blueprinter::Base
  identifier :id
  fields :id, :name

  field :image do |resource|
    resource.image_url
  end

  field :category do |resource|
    resource.category.name
  end

  view :show do
    fields :container, :instructions
    association :ingredients, blueprint: IngredientBlueprint
  end
end