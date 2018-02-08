class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose, :topic)
  end
end
