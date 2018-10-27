class Api::UserTokenController < Knock::AuthTokenController
  protect_from_forgery except: [:create, :current_user] # TODO: 本番環境ではCSRF対策厳格に
  before_action :authenticate

  def create
    signin_user = User.find_by(email: authenticate_params[:email])
    render json: { jwt: auth_token, signinUser: signin_user }
  end

  private

    def authenticate_params
      params.require(:auth).permit(:email, :password)
    end
end
