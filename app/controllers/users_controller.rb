class UsersController < ApplicationController

   before_action :check_authorization, except: [:create, :show]
     before_action :set_user, only: [:show,:password, :password_confirmation, :logged_id]
     before_action :set_look_user, only: [:show]

    def index

        users = User.all
        render json: users, each_serializer: UsersSerializer
  end
  def show
    
    if @set_look_user 
      render json:  @set_look_user, serializer: UsersSerializer, status: :ok
    else
      render json: {error: "User not found"} , status: :not_found
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity 
    end
  end

  def logged_id
    if session[:user_id] 
            render json: @user , serializer: UsersSerializer          
        else
            render json: {error: "User not logged in"}, status: :unauthorized
        end
  end





  private
  # def check_authorization
  #    return render json: { error: "must be logged in!"} , status: :unauthorized unless session.include? :user_id
  #   #  byebug
  # end

  def user_params
        params.permit(:id, :user_name, :email, :phone, :city_id, :password, :password_confirmation)
  end

  def set_look_user

    @set_look_user = User.find_by(id: params[:id])
  end

  def set_user

        @user = User.find_by(id: session[:user_id])

  end
 
end
