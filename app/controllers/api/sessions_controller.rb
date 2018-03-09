class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    errors = {}
    if User.find_by(username: params[:user][:username]) == nil
      errors[:username] = ['Invalid Username.']
    end
    if @user == nil
      errors[:password] = ['Invalid Password.']
    end

    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: errors, status: 401
    end
  end

  def destroy
    if current_user
      logout(current_user)
    else
      render json: ['No one is logged in!'], status: 404
    end
  end
end
