class Api::UserTokenController < Knock::AuthTokenController
  protect_from_forgery except: [:create, :current_user] # TODO: 本番環境ではCSRF対策厳格に
  before_action :authenticate, only: :create

  def create
    # TODO: リファクタリング
    @jwt_token = auth_token
    @login_user = User.find_by(email: params[:auth][:email])
    @login_user.update_attribute(:session_token, auth_token.token)
    render 'jwt_token_and_user_info', formats: 'json', handlers: 'jbuilder'
  end

  def current_user
    # TODO: Strong paramater(他の所にも)
    # TODO: session_tokenカラムを追加するのは悪手な気もするなー
    currentUser = User.find_by(session_token: params[:jwt])
    render json: currentUser
  end

  private
    def jwt_params

    end
end
