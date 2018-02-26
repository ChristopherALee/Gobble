class Api::DirectMessageChannelsController < ApplicationController
  def index
    @direct_message_channels = DirectMessageChannel.all
  end

  def show
    @direct_message_channel = DirectMessageChannel.find(params[:id])
  end

  def create
    @direct_message_channel = DirectChannel.new(direct_channel_params)
    @direct_message_channel.creator_id = current_user.id

    if @direct_message_channel.save
      Pusher.trigger('sidebar_dm', 'dm_created', {})
      render 'api/direct_message_channels/show'
    else
      render json: @direct_message_channel.errors.messages, status: 422
    end
  end

  def destroy
    @direct_message_channel = DirectMessageChannel.find(params[:id])

    if @direct_message_channel && @direct_message_channel.creator_id == current_user.id
      @direct_message_channel.destroy
      render 'api/direct_message_channels/show'
    else
      render json: ['Cannot delete direct message'], status: 403
    end
  end

  def messages
    @direct_message_channel = DirectMessageChannel.find(params[:id])
    render 'api/direct_message_channels/messages'
  end

  private
  def direct_channel_params
    params.require(:direct_message_channel).permit(:id)
  end
end
