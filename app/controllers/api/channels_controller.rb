class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find_by(name: params[:id])
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator_id = current_user.id

    if @channel.save
      Pusher.trigger('sidebar_channel', 'channel_created', {})
      render 'api/channels/show'
    else
      render json: @channel.errors.messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])

    if @channel && @channel.update
      Pusher.trigger('sidebar_channel', 'channel_updated', {})
      render 'api/channels/show'
    else
      render json: ['Cannot edit channel'], status: 403
    end
  end

  def destroy
    @channel = Channel.find(params[:id])

    if @channel && @channel.creator_id == current_user.id
      @channel.destroy
      Pusher.trigger('sidebar_channel', 'channel_deleted', {})
      render 'api/channels/show'
    else
      render json: ['Cannot delete channel'], status: 403
    end
  end

  def messages
    @channel = Channel.find_by(name: params[:name])
    render 'api/channels/messages'
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose)
  end
end
