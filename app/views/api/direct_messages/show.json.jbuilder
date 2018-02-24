json.extract! @direct_message, :id, :author_id, :direct_message_channel_id, :body, :created_at, :updated_at
json.authorName @direct_message.author.username
