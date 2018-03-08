class Api::DirectMessageChannelMembershipsController < ApplicationController
  def index
    @direct_message_channel_memberships = DirectMessageChannelMemberships.all
  end

  def show
    @direct_message_channel_membership = DirectMessageChannelMemberships.find(params[:id])
  end

  def create
    @direct_message_channel_membership = DirectMessageChannelMemberships.new(membership_params)
    # @direct_message_channel_membership.member_id = current_user.id

    if @direct_message_channel_membership.save
      Pusher.trigger('sidebar_dm', 'membership_created', {
        channel: @direct_message_channel_membership.channel.id
        })
      render 'api/direct_message_channel_memberships/show'
    else
      render json: @direct_message_channel_membership.errors.messages, status: 422
    end
  end

  def destroy
    @direct_message_channel_membership = DirectMessageChannelMemberships.find(params[:id])

    if @direct_message_channel_membership && @direct_message_channel_membership.member_id == current_user.id
      @direct_message_channel_membership.destroy
      render 'api/direct_message_channel_memberships/show'
    else
      render json: ['Cannot leave channel'], status: 403
    end
  end

  private
  def direct_message_channel_membership_params
    params.require(:direct_message_channel_membership).permit(:direct_message_channel_id, :member_id)
  end
end
