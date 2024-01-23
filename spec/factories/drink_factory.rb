FactoryBot.define do
  factory :drink do
    sequence(:name) { |n| "Drink #{n}" }
    sequence(:container) { |n| "Container #{n}" }
    category

    after(:create) do |resource, evaluator|
      create_list(:ingredient, 2, drink: resource)
    end
  end
end