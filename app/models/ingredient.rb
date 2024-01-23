class Ingredient < ApplicationRecord
  # @!group Associations

  belongs_to :drink

  # @!group Validations

  validates :drink, presence: true
end
