require "rails_helper"

RSpec.describe Ingredient, type: :model do
  describe "associations" do
    it { is_expected.to belong_to :drink }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of :drink }
  end
end
