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
user21 = User.create({username: 'Pigeon', password: 'password123'})
user22 = User.create({username: 'HeiHei', password: 'password123'})

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
membership4 = Membership.create({member_id: user4.id, channel_id: channel1.id})
membership5 = Membership.create({member_id: user5.id, channel_id: channel1.id})
membership6 = Membership.create({member_id: user6.id, channel_id: channel1.id})
membership7 = Membership.create({member_id: user7.id, channel_id: channel1.id})
membership8 = Membership.create({member_id: user8.id, channel_id: channel1.id})
membership9 = Membership.create({member_id: user9.id, channel_id: channel1.id})
membership10 = Membership.create({member_id: user10.id, channel_id: channel1.id})

membership11 = Membership.create({member_id: user1.id, channel_id: channel2.id})
membership12 = Membership.create({member_id: user2.id, channel_id: channel2.id})
membership13 = Membership.create({member_id: user3.id, channel_id: channel2.id})
membership14 = Membership.create({member_id: user4.id, channel_id: channel2.id})
membership15 = Membership.create({member_id: user5.id, channel_id: channel2.id})
membership16 = Membership.create({member_id: user6.id, channel_id: channel2.id})
membership17 = Membership.create({member_id: user7.id, channel_id: channel2.id})
membership18 = Membership.create({member_id: user8.id, channel_id: channel2.id})
membership19 = Membership.create({member_id: user9.id, channel_id: channel2.id})
membership20 = Membership.create({member_id: user10.id, channel_id: channel2.id})
membership21 = Membership.create({member_id: user11.id, channel_id: channel2.id})
membership22 = Membership.create({member_id: user12.id, channel_id: channel2.id})
membership23 = Membership.create({member_id: user13.id, channel_id: channel2.id})
membership24 = Membership.create({member_id: user14.id, channel_id: channel2.id})
membership25 = Membership.create({member_id: user15.id, channel_id: channel2.id})
membership26 = Membership.create({member_id: user16.id, channel_id: channel2.id})
membership27 = Membership.create({member_id: user17.id, channel_id: channel2.id})
membership28 = Membership.create({member_id: user18.id, channel_id: channel2.id})
membership29 = Membership.create({member_id: user19.id, channel_id: channel2.id})
membership30 = Membership.create({member_id: user20.id, channel_id: channel2.id})

membership31 = Membership.create({member_id: user11.id, channel_id: channel3.id})
membership32 = Membership.create({member_id: user12.id, channel_id: channel3.id})
membership33 = Membership.create({member_id: user13.id, channel_id: channel3.id})
membership34 = Membership.create({member_id: user14.id, channel_id: channel3.id})
membership35 = Membership.create({member_id: user15.id, channel_id: channel3.id})
membership36 = Membership.create({member_id: user16.id, channel_id: channel3.id})
membership37 = Membership.create({member_id: user17.id, channel_id: channel3.id})
membership38 = Membership.create({member_id: user18.id, channel_id: channel3.id})
membership39 = Membership.create({member_id: user19.id, channel_id: channel3.id})
membership40 = Membership.create({member_id: user20.id, channel_id: channel3.id})
membership41 = Membership.create({member_id: user1.id, channel_id: channel3.id})

membership42 = Membership.create({member_id: user16.id, channel_id: channel4.id})
membership43 = Membership.create({member_id: user21.id, channel_id: channel4.id})
membership44 = Membership.create({member_id: user1.id, channel_id: channel4.id})

membership45 = Membership.create({member_id: user13.id, channel_id: channel5.id})
membership46 = Membership.create({member_id: user14.id, channel_id: channel5.id})
membership47 = Membership.create({member_id: user15.id, channel_id: channel5.id})
membership48 = Membership.create({member_id: user16.id, channel_id: channel5.id})
membership49 = Membership.create({member_id: user1.id, channel_id: channel5.id})

membership50 = Membership.create({member_id: user3.id, channel_id: channel6.id})
membership51 = Membership.create({member_id: user21.id, channel_id: channel6.id})
membership52 = Membership.create({member_id: user1.id, channel_id: channel6.id})
membership53 = Membership.create({member_id: user2.id, channel_id: channel6.id})
membership54 = Membership.create({member_id: user22.id, channel_id: channel6.id})

membership55 = Membership.create({member_id: user5.id, channel_id: channel7.id})
membership56 = Membership.create({member_id: user6.id, channel_id: channel7.id})
membership57 = Membership.create({member_id: user9.id, channel_id: channel7.id})
membership58 = Membership.create({member_id: user18.id, channel_id: channel7.id})
membership59 = Membership.create({member_id: user19.id, channel_id: channel7.id})
membership60 = Membership.create({member_id: user20.id, channel_id: channel7.id})
membership61 = Membership.create({member_id: user1.id, channel_id: channel7.id})

membership62 = Membership.create({member_id: user1.id, channel_id: channel8.id})
membership63 = Membership.create({member_id: user2.id, channel_id: channel8.id})
membership64 = Membership.create({member_id: user4.id, channel_id: channel8.id})
membership65 = Membership.create({member_id: user5.id, channel_id: channel8.id})
membership66 = Membership.create({member_id: user7.id, channel_id: channel8.id})
membership67 = Membership.create({member_id: user8.id, channel_id: channel8.id})
membership68 = Membership.create({member_id: user10.id, channel_id: channel8.id})
membership69 = Membership.create({member_id: user11.id, channel_id: channel8.id})
membership70 = Membership.create({member_id: user12.id, channel_id: channel8.id})
membership71 = Membership.create({member_id: user13.id, channel_id: channel8.id})
membership72 = Membership.create({member_id: user14.id, channel_id: channel8.id})
membership73 = Membership.create({member_id: user15.id, channel_id: channel8.id})
membership74 = Membership.create({member_id: user16.id, channel_id: channel8.id})
membership75 = Membership.create({member_id: user17.id, channel_id: channel8.id})

membership76 = Membership.create({member_id: user1.id, channel_id: channel9.id})
membership77 = Membership.create({member_id: user2.id, channel_id: channel9.id})
membership78 = Membership.create({member_id: user3.id, channel_id: channel9.id})
membership79 = Membership.create({member_id: user6.id, channel_id: channel9.id})
membership80 = Membership.create({member_id: user7.id, channel_id: channel9.id})
membership81 = Membership.create({member_id: user8.id, channel_id: channel9.id})
membership82 = Membership.create({member_id: user9.id, channel_id: channel9.id})
membership83 = Membership.create({member_id: user11.id, channel_id: channel9.id})
membership83 = Membership.create({member_id: user17.id, channel_id: channel9.id})

# messages
message1 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "The sky is the daily bread of the eyes."})
message2 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "How can a nation be great if its bread tastes like Kleenex?"})
message3 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "I judge a restaurant by the bread and by the coffee."})
message4 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "For less than the cost of a Big Mac, fries and a Coke, you can buy a loaf of fresh bread and some good cheese or roast beef, which you will enjoy much more."})
message5 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "I like reality. It tastes like bread."})
message6 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "Deliberation, n.: The act of examining one’s bread to determine which side it is buttered on."})
message7 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "A loaf of bread, a jug of wine, and thou."})
message8 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "Waffles are just awesome bread."})
message9 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "I like bread, and I like butter - but I like bread with butter best."})
message10 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "Butter was meant to be spread."})
message11 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "We need four things to survive life: bread, water, oxygen, and dreams!"})
message12 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "A man needs only his daily bread."})

message13 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "Bubbles enters with a plate overflowing with rugelach.
The three of us fall silent as we indulge in the small snail-shaped pastries of tender cream-cheese-infused dough wrapped around various fillings: one with walnuts and cinnamon, one bursting with chocolate, one with a thick, sweet poppy seed paste, and one with apricot jam that has been bumped up with some chewy bits of diced dried apricots."})
message14 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "Don't eat the bread unless you want to leave bread crumbs."})
message15 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "I'd rather teach you how to make BREAD than give you a SLICE from my BREAD."})
message16 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "Whoever hungers for living Bread, shall be filled."})
message17 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "People who eat white bread have no dreams."})
message18 = Message.create({author_id: user3.id, channel_id: channel1.id, body: "You believe stealing is wrong, but if your family was starving and could not afford bread, wouldn't you say it’s okay to steal a loaf to feed them?"})
message19 = Message.create({author_id: user1.id, channel_id: channel1.id, body: "With bread and wine you can walk your road."})
message20 = Message.create({author_id: user2.id, channel_id: channel1.id, body: "If you run out of dough, all you knead is love."})

# Direct Messaging
direct_message_channel1 = DirectMessageChannel.create({creator_id: user1.id})

direct_message_channel_membership1 = DirectMessageChannelMembership.create({member_id: user1.id, direct_message_channel_id: direct_message_channel1.id})
direct_message_channel_membership2 = DirectMessageChannelMembership.create({member_id: user2.id, direct_message_channel_id: direct_message_channel1.id})

direct_message1 = DirectMessage.create({author_id: user1.id, direct_message_channel_id: direct_message_channel1.id, body: "Hi there!"})
direct_message2 = DirectMessage.create({author_id: user2.id, direct_message_channel_id: direct_message_channel1.id, body: "Oh hey!"})
