class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def show
    @message = Message.find(params[:id])
  end

  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      Pusher.trigger('channel_messages', 'message_created', {})
      render 'api/messages/show'
    else
      render json: @message.errors.messages, status: 422
    end
  end

  def update
    @message = Message.find(params[:id])

    if @message.author_id == current_user.id && @message.save
      Pusher.trigger('channel_messages', 'message_updated', {})
      render 'api/messages/show'
    else
      render json: ['Cannot edit message'], status: 403
    end
  end

  def destroy
    @message = Message.find(params[:id])

    if @message && @message.author_id == current_user.id
      @message.destroy
      Pusher.trigger('channel_messages', 'message_deleted', {})
      render 'api/message/show'
    else
      render json: ['Cannot delete message'], status: 403
    end
  end

  private
  def message_params
    params.require(:message).permit(:channel_id, :body)
  end
end
