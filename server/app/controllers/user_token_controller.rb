class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token, raise: false
  config.token_secret_signature_key = -> { Rails.application.credentials.fetch(:secret_key_base) }
end
