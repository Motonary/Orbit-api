class ApplicationController < ActionController::API
  include Knock::Authenticable

  rescue_from StandardError,
    with: lambda { |e| response_error(e) } unless Rails.env.development?

  def response_error(exception)
    status_code = ActionDispatch::ExceptionWrapper.new(request.env, exception).status_code

    ExceptionNotifier.logger_notify(exception, data: request.params)
    render json: {message: exception.message}, status: status_code
  end
end
