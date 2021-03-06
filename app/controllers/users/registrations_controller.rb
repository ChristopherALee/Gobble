# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    errors = {}

    @user = User.find_by(username: params[:user][:username])
    if @user
      errors[:username] = ["Username already exists!"]
      render json: errors, status: 422
      return
    end

    @user = User.new(params.require(:user).permit(:username, :password))

    if @user.username.length < 3
      errors[:username] = ["Username must be at least 3 characters."]
      errors[:password] = ["Password must be at least 6 characters."] if @user.password.length < 6
      render json: errors, status: 422
    elsif @user.save
      sign_in @user
      render '/api/users/show'
    else
      errors[:username] = ["Username can't be blank."] if @user.username.length === 0
      errors[:password] = ["Password must be at least 6 characters."] if @user.password.length < 6

      render json: errors, status: 422
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    @user = User.find_by(username: params[:username][:username])
    
    if params[:last_visited_channel]
      user_params = { last_visited_channel: params[:last_visited_channel] }
    elsif params[:is_online]
      user_params = { is_online: params[:is_online] }
    end

    if @user.update(user_params)
      if user_params[:is_online]
        Pusher.trigger('user_presence', 'user_online', { user: @user })
      end

      render '/api/users/show'
    else
      render json: @user.errors.messages, status: 422
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :password])
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
