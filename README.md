<div align="center">
  <img src="./app/assets/images/logos/gobble_readme_logo3.png"></img>
</div>

# Background

**Gobble** is a full-stack single page messaging application inspired by Slack. It uses Ruby on Rails on the backend to produce a 'RESTful' API and React/Redux on the frontend. It also features Pusher to implement WebSockets seamlessly.

<div align="center">
  <img src="./readme_images/gobble-ss-final.png"></img>
</div>

# Features

* User Authentication with automated demo-login using Devise
* Live-Messaging
* Channels
* Direct Messages
* Group Messages
* User Presence (Online, Offline)

## User Authentication with automated demo-login using Devise

Users can use the demo-login provided to sign into Gobble. Authentication is implemented using the Devise gem.

```ruby
class Users::SessionsController < Devise::SessionsController
  def create
    @user = User.find_for_database_authentication(username: params[:user][:username])
    errors = {}

    if @user && @user.valid_password?(params[:user][:password])
      sign_in @user
      render 'api/users/show'
    else
      if User.find_by(username: params[:user][:username]) == nil
        errors[:username] = ['Invalid Username.']
      end

      errors[:password] = ['Invalid Password.']
      render json: errors, status: 401
    end
  end

  def destroy
    if current_user
      render json: current_user
      sign_out current_user
    else
      render json: ["No one is logged in!"], status: 404
    end
  end
end
```

## Live-Messaging

Using Pusher to interact with WebSockets, live-messaging between users in channels, direct messages, and group messages are seamless and intuitive.

Pusher triggers an action for a specified channel whenever a new message is created:

```ruby
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      Pusher.trigger('channel_messages', 'message_created', {channelName: @message.channel.name})
      render 'api/messages/show'
    else
      render json: @message.errors.messages, status: 422
    end
  end
```

The messages components then subscribe to these actions on mounting and respond accordingly:

```javascript
let that = this;
this.channelMessages = this.pusher.subscribe("channel_messages");
this.channelMessages.bind("message_created", function(data) {
  that.getChannelMessages(that.props.currentChannel.name);
});
```

![Live-Messaging](./readme_images/gobble-live-messaging.gif)

## Notifications

When the user is viewing a current channel, direct message, or group message, and an incoming message is delivered, the messages component renders a "new messages" banner or automatically scrolls down to the most recent message depending on the current user's scroll height when viewing messages. If the "new messages" banner is rendered, the user can click on it to view the new message(s).

![Current-Channel-Notifications](./readme_images/gobble-current-channel-notifications.gif)

## Channels / Direct Messages / Group Messages

### Channel Search

Users can browse existing channels via live-search. In the same component, they can also see which channels they currently belong to and those they can join. Viewing any channel from the channel search component is as simple as a click of a button.

### Channel Creation

Users can create their own channel from the channel creation form. Error handling is done on the front-end for immediate feedback on whether or not the current channel parameters are valid. If invalid, the applicable input fields will render a red border around themselves and the 'Create Channel' button will be disabled and 'greyed out' for the user to visibly be notified that their input is invalid.

# Development Timeline

1.  **[DONE]** User Authentication
2.  **[DONE]** Landing Page
3.  **[DONE]** Pusher Implementation
4.  **[DONE]** Channels
5.  **[DONE]** Channel Search
6.  **[DONE]** Channel Group Messages
7.  **[DONE]** Direct Messages
8.  **[DONE]** Online/Offline User Activity
9.  Notifications
10. Paperclip Implementation
11. User profile photo
12. User photo messaging
