require "rails_helper"

RSpec.describe Api::DrinksController, type: :controller do
  let(:params) { {} }
  let(:json) { JSON.parse(response.body) }

  describe "GET /api/search" do
    let!(:drink_1) { FactoryBot.create(:drink, name: "Margarita") }
    let!(:drink_2) { FactoryBot.create(:drink, name: "Vodka") }
    let!(:drink_3) { FactoryBot.create(:drink, name: "Blahblahritablah") }

    context "without params" do
      before do
        FactoryBot.create_list(:drink, 12)
        get :search, params: params
      end

      it "returns the first 10 results" do
        expect(json["drinks"].count).to eq 10
        expect(json["drinks"][0]["name"]).to eq "Margarita"
        expect(json["drinks"][1]["name"]).to eq "Vodka"
        expect(json["drinks"][2]["name"]).to eq "Blahblahritablah"
      end
    end

    context "with a limit" do
      before do
        params[:limit] = 2
        get :search, params: params
      end

      it "returns the first 2 results" do
        expect(json["drinks"].count).to eq 2
        expect(json["drinks"][0]["name"]).to eq "Margarita"
        expect(json["drinks"][1]["name"]).to eq "Vodka"
      end
    end

    context "with an index" do
      before do
        FactoryBot.create_list(:drink, 12)
        params[:index] = 1
        get :search, params: params
      end

      it "returns the second page of results" do
        expect(json["drinks"].count).to eq 5
        expect(json["drinks"][0]["name"]).not_to eq "Margarita"
      end
    end

    context "with a query" do
      before do
        params[:query] = "rita"
        get :search, params: params
      end

      it "returns matching results" do
        expect(json["drinks"].count).to eq 2
        expect(json["drinks"][0]["name"]).to eq "Margarita"
        expect(json["drinks"][1]["name"]).to eq "Blahblahritablah"
      end
    end
  end

  describe "GET /api/detail" do
    let!(:drink) { FactoryBot.create(:drink) }

    context "with a valid ID" do
      before do
        params[:id] = drink.id
        get :show, params: params
      end

      it "returns the drink details" do
        expect(json["drinks"].count).to eq 1
        expect(json["drinks"][0]["name"]).to eq drink.name
        expect(json["drinks"][0]["category"]).to eq drink.category.name
        expect(json["drinks"][0]["container"]).to eq drink.container
        expect(json["drinks"][0]["ingredients"]).to eq([
          { "name" => drink.ingredients[0].name, "measurement" => drink.ingredients[0].measurement },
          { "name" => drink.ingredients[1].name, "measurement" => drink.ingredients[1].measurement }
        ])
      end
    end

    context "with an invalid ID" do
      before do
        params[:id] = 0
        get :show, params: params
      end

      it "returns a 404 error" do
        expect(json["errors"][0]["code"]).to eq 404
      end
    end
  end
end
