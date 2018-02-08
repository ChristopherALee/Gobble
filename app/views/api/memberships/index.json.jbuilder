@memberships.each do |membership|
  json.set! membership.id do
    json.extract! channel, :id, :member_id, :channel_id
  end
end
