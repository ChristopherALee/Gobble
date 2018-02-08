class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator_id = current_user.id
    
    if @channel.save
      render 'api/channels/show'
    else
      render json: @channel.errors.messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])

    if @channel && @channel.update
      render 'api/channels/show'
    else
      render json: ['Cannot edit channel'], status: 403
    end
  end

  def destroy
    @channel = Channel.find(params[:id])

    if @channel && @channel.creator_id == current_user.id
      @channel.destroy
      render 'api/channels/show'
    else
      render json: ['Cannot delete channel'], status: 403
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose, :topic)
  end
end
