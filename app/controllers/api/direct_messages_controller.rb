class Api::DirectMessagesController < ApplicationController
  def index
    @direct_messages = DirectMessage.all
  end

  def show
    @direct_message = DirectMessage.find(params[:id])
  end

  def create
    @direct_message = DirectMessage.new(direct_message_params)
    @direct_message.author_id = current_user.id

    if @direct_message.save
      Pusher.trigger('direct_messages', 'message_created', {channelName: @direct_message.channel.name})
      render 'api/direct_messages/show'
    else
      render json: @direct_message.errors.messages, status: 422
    end
  end

  def update
    @direct_message = DirectMessage.find(params[:id])

    if @direct_message.author_id == current_user.id && @direct_message.save
      Pusher.trigger('direct_messages', 'message_updated', {})
      render 'api/direct_messages/show'
    else
      render json: ['Cannot edit direct_message'], status: 403
    end
  end

  def destroy
    @direct_message = DirectMessage.find(params[:id])

    if @direct_message && @direct_message.author_id == current_user.id
      @direct_message.destroy
      Pusher.trigger('channel_messages', 'message_deleted', {})
      render 'api/direct_messages/show'
    else
      render json: ['Cannot delete direct_message'], status: 403
    end
  end

  private
  def direct_message_params
    params.require(:direct_message).permit(:direct_message_channel_id, :body)
  end
end
