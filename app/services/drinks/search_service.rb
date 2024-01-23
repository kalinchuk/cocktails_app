class Drinks::SearchService < BaseService
  def initialize(drinks, query, index, limit)
    @drinks = drinks
    @query = query
    @index = (index || 0).to_i
    @limit = (limit || 10).to_i
  end

  # This method would be more efficient using elastic search
  # but for the sake of simplicity and lack of time
  # we will use the inefficient SQL LIKE operator
  def call
    drinks = @drinks.offset(@index * @limit).limit(@limit)
    drinks = drinks.where("name LIKE ?", "%#{@query}%") if @query.present?
    drinks
  end
end