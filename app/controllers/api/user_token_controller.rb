class Api::UserTokenController < Knock::AuthTokenController
  protect_from_forgery except: [:create, :current_user] # TODO: 本番環境ではCSRF対策厳格に
  before_action :authenticate #TODO: 正直これの役割よくわかってないからあとでちゃんと理解

  def create
    signin_user = User.find_by(email: authenticate_params[:email])
    render json: { jwt: auth_token, signinUser: signin_user }
  end

  private

    def authenticate_params
      params.require(:auth).permit(:email, :password)
    end
end
