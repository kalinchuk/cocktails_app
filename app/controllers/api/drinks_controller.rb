class Api::DrinksController < Api::ApiController
  def search
    resources = Drinks::SearchService.call(
      drinks, params[:query], params[:index], params[:limit]
    )
    render json: DrinkBlueprint.render(resources, root: "drinks")
  end

  def show
    resource = drinks.find(params[:id])
    render json: DrinkBlueprint.render([resource], view: :show, root: "drinks")
  end

  private

  def drinks
    Drink.all
  end
end