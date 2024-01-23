FactoryBot.define do
  factory :ingredient do
    sequence(:name) { |n| "Ingredient #{n}" }
    sequence(:measurement) { |n| "Measurement #{n}" }
  end
end