module Response
  def json_response(object, status = :ok)
    render json: object.to_json(except: :id), status: status
  end
end