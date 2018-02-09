@memberships.each do |membership|
  json.set! membership.id do
    json.memberName membership.member.username
    json.channelName membership.channel.name
  end
end
