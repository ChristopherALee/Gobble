class Api::MembershipsController < ApplicationController
  def index
    @memberships = Membership.all
  end

  def show
    @membership = Membership.find(params[:id])
  end

  def create
    @membership = Membership.new(membership_params)
    @membership.member_id = current_user.id

    if @membership.save
      Pusher.trigger('sidebar_channel', 'membership_created', {
        channel: @membership.channel.name
        })
      render 'api/memberships/show'
    else
      render json: @membership.errors.messages, status: 422
    end
  end

  def destroy
    @membership = Channel.find(params[:id])

    if @membership && @membership.member_id == current_user.id
      @membership.destroy
      render 'api/memberships/show'
    else
      render json: ['Cannot leave channel'], status: 403
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:channel_id)
  end
end
