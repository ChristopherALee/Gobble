# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
Membership.destroy_all
Message.destroy_all

DirectMessageChannel.destroy_all
DirectMessageChannelMembership.destroy_all
DirectMessage.destroy_all

# users
user1 = User.create({username: 'guest', password: 'password123'})
user2 = User.create({username: 'BigBird', password: 'password123'})
user3 = User.create({username: 'Tweety', password: 'password123'})
user4 = User.create({username: 'Woodstock', password: 'password123'})
user5 = User.create({username: 'Daffy', password: 'password123'})
user6 = User.create({username: 'Donald', password: 'password123'})
user7 = User.create({username: 'Woody', password: 'password123'})
user8 = User.create({username: 'ToucanSam', password: 'password123'})
user9 = User.create({username: 'Daisy', password: 'password123'})
user10 = User.create({username: 'Iago', password: 'password123'})
user11 = User.create({username: 'Zazu', password: 'password123'})
user12 = User.create({username: 'Tootsie', password: 'password123'})
user13 = User.create({username: 'Skipper', password: 'password123'})
user14 = User.create({username: 'Private', password: 'password123'})
user15 = User.create({username: 'Rico', password: 'password123'})
user16 = User.create({username: 'Kowalski', password: 'password123'})
user17 = User.create({username: 'Kevin', password: 'password123'})
user18 = User.create({username: 'Huey', password: 'password123'})
user19 = User.create({username: 'Dewey', password: 'password123'})
user20 = User.create({username: 'Louie', password: 'password123'})

# channels
channel1 = Channel.create({name: 'bread', creator_id: user1.id, purpose: 'we like bread', topic: 'bread on the 5th floor!'})
channel2 = Channel.create({name: 'hangouts', creator_id: user2.id, purpose: 'find random places to perch', topic: '8th street park! now!!'})
channel3 = Channel.create({name: 'windows', creator_id: user3.id, purpose: 'how do they work?', topic: 'stop crashing into windows'})
channel4 = Channel.create({name: 'pigeons', creator_id: user1.id, purpose: 'we are pigeons!', topic: 'New York born and raised'})
channel5 = Channel.create({name: 'seagulls', creator_id: user2.id, purpose: 'we are seagulls!', topic: 'Saturday night party: Pier 88'})
channel6 = Channel.create({name: 'chickens', creator_id: user3.id, purpose: 'we are chickens!', topic: "who keeps taking ms.cluck's eggs?"})
channel7 = Channel.create({name: 'ducks', creator_id: user1.id, purpose: 'we are ducks!', topic: 'river quackin'})
channel8 = Channel.create({name: 'migration', creator_id: user2.id, purpose: 'Seasonal Migration Announcements', topic: 'Prep for Spring migration!'})
channel9 = Channel.create({name: 'egg-daycare', creator_id: user3.id, purpose: 'find egg-sitters for your nest', topic: 'egg-stealers will not be tolerated!'})

# memberships
membership1 = Membership.create({member_id: user1.id, channel_id: channel1.id})
membership2 = Membership.create({member_id: user2.id, channel_id: channel1.id})
membership3 = Membership.create({member_id: user3.id, channel_id: channel1.id})
membership4 = Membership.create({member_id: user1.id, channel_id: channel2.id})
membership5 = Membership.create({member_id: user2.id, channel_id: channel2.id})
membership6 = Membership.create({member_id: user3.id, channel_id: channel2.id})
membership7 = Membership.create({member_id: user1.id, channel_id: channel3.id})
membership8 = Membership.create({member_id: user2.id, channel_id: channel3.id})
membership9 = Membership.create({member_id: user3.id, channel_id: channel3.id})

# messages
message1 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test"})
message2 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test2"})
message3 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test3"})
message4 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test4"})
message5 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test5"})
message6 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test6"})
message7 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test7"})
message8 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test8"})
message9 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test9"})
message10 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test10"})
message11 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test11"})
message12 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test12"})

message13 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test13"})
message14 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test14"})
message15 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test15"})
message16 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test16"})
message17 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test17"})
message18 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test18"})
message19 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test19"})
message20 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test20"})
message21 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test21"})
message22 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "test22"})
message23 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "test23"})
message24 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "test24"})

# Direct Messaging
direct_message_channel1 = DirectMessageChannel.create({creator_id: user1.id})

direct_message_channel_membership1 = DirectMessageChannelMembership.create({member_id: user1.id, direct_message_channel_id: direct_message_channel1.id})
direct_message_channel_membership2 = DirectMessageChannelMembership.create({member_id: user2.id, direct_message_channel_id: direct_message_channel1.id})

direct_message1 = DirectMessage.create({author_id: user1.id, direct_message_channel_id: direct_message_channel1.id, body: "Hi there!"})
direct_message2 = DirectMessage.create({author_id: user2.id, direct_message_channel_id: direct_message_channel1.id, body: "Oh hey!"})
