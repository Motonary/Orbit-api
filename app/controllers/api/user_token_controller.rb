class Api::UserTokenController < Knock::AuthTokenController
  protect_from_forgery except: [:create, :current_user] # TODO: 本番環境ではCSRF対策厳格に
  before_action :authenticate, only: :create #TODO: 正直これの役割よくわかってないからあとでちゃんと理解

  def create
    login_user = User.find_by(email: params[:auth][:email])
    login_user.update_attribute(:session_token, auth_token.token)
    render json: { jwt: auth_token, loginUser: login_user }
  end

  def current_user
    # TODO: リロードのたびにいちいちsession_tokenカラムを参照するのは悪手な気もするなー
    currentUser = User.find_by(session_token: params[:jwt])
    render json: currentUser
  end
end
