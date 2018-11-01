class ApplicationController < ActionController::API
  include Knock::Authenticable

  def fallback_index_html
    render :file => 'frontend/dist/index.html'
  end
end
