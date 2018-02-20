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

# users
user1 = User.create({username: 'guest', password: 'password123'})
user2 = User.create({username: 'chris', password: 'password123'})
user3 = User.create({username: 'lily', password: 'password123'})

# channels
channel1 = Channel.create({name: 'bread', creator_id: user1.id, purpose: 'we like bread', topic: 'bread on the 5th floor!'})
channel2 = Channel.create({name: 'hangouts', creator_id: user2.id, purpose: 'find random places to perch', topic: '8th street park! now!!'})
channel3 = Channel.create({name: 'windows', creator_id: user3.id, purpose: 'how do they work?', topic: 'stop crashing into windows'})

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
