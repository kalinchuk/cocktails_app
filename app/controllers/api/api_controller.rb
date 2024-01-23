class Api::ApiController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound do |exception|
    render_not_found(detail: exception.message)
  end

  private

  def render_not_found(options = {})
    render status: :not_found, json: {
      errors: [
        { code: 404, title: "Not Found" }.merge(options)
      ]
    }
  end
end