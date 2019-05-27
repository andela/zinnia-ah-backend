import uuidv4 from 'uuidv4';
import faker from 'faker';
import slug from 'slug';

export default {
  up: async queryInterface =>
    await queryInterface.bulkInsert('Articles', [
      {
        id: '141f4f05-7d81-4593-ab54-e256c1006210',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'EMMSDAN article',
        slug: slug(`Hello Article 1-${uuidv4()}`),
        description: `A girl named Jillian takes her little sisters Katie and Amanda, accompanied by their doll Mary-Ellen,
          to a puppet show of a teenager named Jimmy O'James, with Slappy the Dummy as his partner.`,
        body: `A girl named Jillian takes her little sisters Katie and Amanda, accompanied by their doll Mary-Ellen,
          to a puppet show of a teenager named Jimmy O'James, with Slappy the Dummy as his partner. At the show,
          Slappy spies the twins and Jillian with Mary-Ellen.
          Slappy then pulls the twins up on stage with Mary-Ellen and makes fun of them. The twins,
          who are hurt by what he said,
          take off after the show to give him a piece of their minds and Jillian has to find them.
          While trying to find her twin sisters,
          Jillian finds Jimmy and Slappy's dressing room and walks in on Slappy giving Jimmy a punch in the nose.
          Jimmy tells her that he and Slappy are just working on a new act. She asks if they have seen her sisters.
          Jimmy responds with that he has not seen them since they were on stage. After she leaves,
          Jimmy puts Slappy to sleep and throws him out.
          Jillian's friend Harrison finds Slappy and brings him to Jillian's house as he believes that
          Slappy is broken and wants Jillian's dad to fix him. After a series of troublesome events,
          Jillian and Harrison host a birthday party and try to put on a show only to have it be revealed that
          Mary-Ellen is alive and that she re-awoke Slappy so she could marry him, but Slappy hates Mary-Ellen and
          desires to marry Jillian. Slappy and Mary Ellen end getting cut to pieces by a saw blaze but Slappy's spirt
          ends up possessing Jillian. Britney Crosbey and her friend, Molly Molloy, have to put up with
          Britney's obnoxious cousin, Ethan, and his new friend Slappy, whom Ethan calls \"Mr. Bad Boy\".
          Slappy, though, seems to be the one causing the trouble this time, and Britney decides to put
          Slappy to sleep, after seeing that she only had to say the magic words again—simple as that.
          But then when she finds out that Slappy was reawakened by the magic words,
          he vows revenge and comes up with a plan to use a special 'Mind-Stealer'
          doll to make Britney into his own personal perfect slave. At the end, Britney decides to use the
          'Mind-Stealer' doll against Slappy, whose mind gets stolen at the end of the book.
          Slappy later makes another appearance in Dr. Maniac Vs. Robby Shwartz where he hunts down Britney and
          Molly and cruelly has them send Robby back to Horrorland's arcade and in Say Cheese and Die Screaming
          where after taking a picture of Madam Dooms booth Julie sees Slappy in the picture leaning against the both.
          Trina and Daniel O'Dell's dad came home one night with the broken Slappy, which he got for free from a guy
          which he believes is Amy's father. Shortly after that day ends, the dummy soon gets fixed by healing itself
          all because the family read the infamous note that came with him, and soon was later named by their father
          as \"Smiley\" and became his new favorite dummy. A part of his amazing collection. But ever since their
          cousin Zane had decided to spend a few nights at their house once again, problems start to occur with
          the other dummies in the form of pranks, the main one being Rocky who was first found in an event with him
          being seen by Zane in his bedroom. In all these cases Trina and Daniel were blamed for the events which made
          them unhappy. Later it turns out the real trouble maker is Slappy, with help from the other dummies who he
          brought to life, which in the end becomes hell to Slappy when he is betrayed by them to protect the O'Dells.
          However, despite seemingly being killed, the evil dummy is caught by Trina winking at her as Zane carries
          him to the car. In the first Night Of The Living Dummy book, Twin sisters Lindy and Kris Powell are taking a
          walk when they come across a dummy who Lindy names Slappy. Lindy decides to keep Slappy even though Kris
          does not like Slappy. Lindy becomes a good ventriloquist and Kris gets jealous. So, Kris gets a dummy named
          Mr. Wood and from there on bad things start happening. Mr. Wood is defeated by the end after getting crushed
          to death by a steamroller. However, Slappy then comes alive and grabs Kris as she is going to shut the window.
          Unlike other books, Slappy never causes any trouble despite being alive until the end.`,
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1533036618/mb0zefwbaccwnsuwretb.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '461be77c-587c-49f7-983e-58d0b69a93f4',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Messi: the GOAT',
        slug: slug(`Messi: the GOAT-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '47d790b9-9995-40df-a1e6-c3ad634253ef',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'How to live long',
        slug: slug(`How to live long-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499267/zfzagvwapebjvr5tzxbt.svg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '48d6899d-a49a-4a36-9573-9f04961989f6',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Giving back to the community',
        slug: slug(`Giving back to the community-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531498302/w5pxscssyqtgft2lhuny.svg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '0aedc83d-5172-4874-bc43-7826e955fccb',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'DC owns this article',
        slug: 'Hello-Article-5-3b8ab5fa-c594-4d5a-be6c-0b56888bb299',
        description: `We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. `,
        body: `
         We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery.
         Nature is our best friend which provides us all the resources to live here. It gives us water to drink, pure air
         to breathe, food to eat, land to stay, animals, plants for our other uses, etc for our betterment.
         We should fully enjoy the nature without disturbing its ecological balance. We should care our nature,
         make it peaceful, keep it clean and prevent it from the destruction so that we can enjoy our nature forever.
         Nature is a most precious gift given by the God to us to enjoy but Nature is the most beautiful and attractive
         surrounding around us which make us happy and provide us natural environment to live healthy.
         Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land,
         running rivers, sea, forests, air, mountains, valleys, hills and many more things.
         Our God has created a beautiful nature for the healthy living of us. All the things we use for our
         living are the assets of nature which we should not spoil and damage. We should not destroy the originality of
         the nature and should not imbalance the ecosystem cycle. Our nature provides us beautiful environment to
         live and enjoy so it is our responsibility to keep it clean and away from all the damages.
         In the modern era, many selfish and bad activities of the human being have disturbed the nature to a
         great extent. But we all should try to maintain our nature’s beauty. by providing all the required resources
         for daily living. We should thankful to our nature for helping, caring and nurturing us like a mother.
         We can enjoy the sweet sound and scenery of the nature if we peacefully sit in the early morning in the
         garden. Our nature is adorned with lots of scenic beauty which we can enjoy anytime.
         Earth has geographical beauty and known as the city of garden or heaven.
         But it is sad to say that such beautiful gifts of God are declining day by day due to the technological
         advancement and high level of ignorance of the human beings. Nature is like our real mother which never harms
         us but always nourishes us. Walking in the lap of nature in the early morning makes us healthy and
         strong as well as keeps us away from many lethal diseases like diabetes, chronic heart diseases, high blood
         pressure, liver problem, digestive system ailments, infections, brain disease, etc.
         It is good for our health to hear the soft sound of the birds, rattle of the breeze, sound of running
         fresh air, sound of running water in the river, etc in the early morning. Most of the poets, writers and
         people used to of yoga and meditation are seen in the early morning in the garden to re-energize their
         body, mind and soul.`,
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531497285/wlki6g8nykxdodyd4ixq.svg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'cd75c9de-324e-4b7e-be68-64c0ce09bc4d',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'DC property',
        slug: slug(`Hello Article 8-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1523911955/brainstorm_l87u78.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 9',
        slug: 'Hello-Article-9-5a6fab9c-5849-4be5-973c-5a371165cd5',
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1514128720/mike_vobxlw.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'cc75f9de-324e-4b7e-be68-64c0ce09bc4d',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'used for delete article',
        slug: slug(`used for delete article-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'While I am testing, this post will be deleted',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1509347819/stay_connected_iru4aq.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '5d385a55-5089-4ae4-83af-767dbe106f4c',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Owning your learning in life',
        slug: slug(`Owning your learning in life-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1509347819/stay_connected_iru4aq.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '747d9de5-e272-4201-bcfc-6d703aa5a6a5',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Hello Article 10',
        slug: slug(`Hello Article 10-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1504929549/sample.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '77b17aab-cff8-43f6-81e1-3f0d3afeb23b',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Hello Article 11',
        slug: slug(`Hello Article 11-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1550365575/demo/an38yitvd6gluvvhisim.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '795bb49c-1a36-4b55-adf3-865088acb3b6',
        user_id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
        title: 'Hello Article 12',
        slug: slug(`Hello Article 12-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1550758125/demo/hmbbdx0w5zpqujppfgvp.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'd6b9565b-a9de-4d46-ac04-b5e3bc12c22a',
        user_id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
        title: 'Hello Article 13',
        slug: slug(`Hello Article 13-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531497285/wlki6g8nykxdodyd4ixq.svg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '7c6060e6-cbe3-41cc-b889-5901892c904d',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Hello Article 14',
        slug: slug(`Hello Article 14-${uuidv4()}`),
        description:
          'Our nature provides us variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '88f5e45f-0c85-49c1-ba82-baf3b0129678',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Hello Article 15',
        slug: slug(`Hello Article 15-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '8d779273-a5d3-4e48-8887-a412cc091353',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'Hello Article 16',
        slug: slug(`Hello Article 16-${uuidv4()}`),
        description:
          'We live on the most beautiful planet, Earth which has very clean and attractive nature full of greenery. ',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '931a52df-8f8b-4ea1-bce8-a3caab25c2e0',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'Hello Article 17',
        slug: slug(`Hello Article 17-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '0aedc83d-5172-5874-bc43-7826e945fccc',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'Hello Article 18',
        slug: slug(`Hello Article 18-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '310f2591-ae59-4e28-bc0c-602883cac4c7',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 61',
        slug: slug(`Hello Article 61-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: 'cd75c9de-324e-4b7e-be68-64c0ce09bd4d',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 6',
        slug: slug(`Hello Article 6-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        read_time: '0',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '3375c9de-324e-4b7e-be68-64c12e09bd4d',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 19',
        slug: slug(`Hello Article 19-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'cd75c1de-324e-4b7e-be68-64c0ce09bdd4',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'Hello Article 20',
        slug: slug(`Hello Article 20-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 21',
        slug: slug(`Hello Article 21-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 22',
        slug: slug(`Hello Article 22-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 23',
        slug: slug(`Hello Article 23-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 24',
        slug: slug(`Hello Article 24-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 25',
        slug: slug(`Hello Article 25-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 26',
        slug: slug(`Hello Article 26-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 27',
        slug: slug(`Hello Article 27-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1517244412/stil-326695_l0bkmk.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 28',
        slug: slug('Hello Article 6-5a371165cd57'),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 29',
        slug: slug(`while i wait for you - 987say6tds3h`),
        description: 'Description goes here',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1533036618/mb0zefwbaccwnsuwretb.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Test Article for likes and unlikes',
        slug: slug('Hello Article 31-4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f'),
        description: 'UGOJI added this article to run his tests',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4ea984b7-c450-4fe3-9db2-4e3e8c308e5f',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Test Article for likes and unlikes',
        slug: slug('Hello Article 31-4e3e8c308e5f'),
        description: 'UGOJI added this article to run his tests',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1533036618/mb0zefwbaccwnsuwretb.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '8ebdfc3c-ffd7-440a-80f3-ab4ebeeb9cae',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Highlights Test Article',
        slug: slug('Hello Article 5-842afa04-cc9e-43ad-9384-007793d3fdcb'),
        description: 'Description goes here, Eben',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1531499318/mbppkzeehprspnbbcym8.png',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'fde67992-75c1-44b6-a60a-007837c52006',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: faker.lorem.sentence(1),
        slug: slug('why i kill the bird - fde6799275c1'),
        description: faker.lorem.paragraphs(1),
        body: faker.lorem.paragraphs(30),
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1533036618/mb0zefwbaccwnsuwretb.jpg',
        read_time: '0',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4ec884b7-c450-4fe3-9db2-4e3e8c308e5f',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'This will be deleted from the table',
        slug: slug('this should have been-c450-4fe3-8c3e-4e3e8c308e5f'),
        description: 'UGOJI added this article to run his tests',
        body: 'Another Body',
        image_thumbnail:
          'https://res.cloudinary.com/nedy123/image/upload/v1533036618/mb0zefwbaccwnsuwretb.jpg',
        read_time: '0',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
    ]),
  down: async queryInterface => queryInterface.bulkDelete('Articles', null, {}),
};
