class Drink < ApplicationRecord
  # @!group Associations
  
  belongs_to :category
  has_many :ingredients, dependent: :destroy

  # @!group Validations

  validates :name, presence: true
  validates :category, presence: true
end
