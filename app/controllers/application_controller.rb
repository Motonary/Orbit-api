class ApplicationController < ActionController::API
  include Knock::Authenticable

  rescue_from StandardError,
    with: lambda { |e| response_error(e) }
 
  def response_error(exception)
    status_code = ActionDispatch::ExceptionWrapper.new(env, exception).status_code

    ExceptionNotifier.logger_notify(exception, env: env, data: params)
    
    render json: {message: exception.message}, status: status_code
  end

  def fallback_index_html
    render :file => 'frontend/dist/index.html'
  end
end
