import { hashPassword } from '../../utils/helpers.utils';
import { ADMIN, AUTHOR } from '../../utils/constants';

export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          username: 'igbominadeveloper',
          first_name: 'igbomina',
          last_name: 'developer',
          email: 'igbominadeveloper@ah.com',
          role: AUTHOR,
          bio:
            'Six started far placing saw respect females old. Civilly why how end viewing attempt related enquire visitor. Man particular insensible celebrated conviction stimulated principles day. Sure fail or in said west. Right my front it wound cause fully am sorry if. ',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988733/Authors%20Haven/authors/author6.jpg',
          password: await hashPassword('password1'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '5a6fab9c-5849-4be5-973f-5b371165cd57',
          username: 'favourafolayan',
          first_name: 'favour',
          last_name: 'Afolayan',
          email: 'favourafolayan@ah.com',
          role: AUTHOR,
          bio:
            'Procuring education on consulted assurance in do. Is sympathize he expression mr no travelling. Preference he he at travelling in resolution. So striking at of to welcomed resolved. Northward by described up household therefore attention. ',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988731/Authors%20Haven/authors/author12.jpg',
          password: await hashPassword('favourafolayan'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '4c6fab4c-3926-4be5-166c-4a911165cd35',
          username: 'superadmin',
          email: 'admin@ah.com',
          first_name: 'super',
          last_name: 'Admin',
          bio:
            'No opinions answered oh felicity is resolved hastened. Produced it friendly my if opinions humoured. Enjoy is wrong folly no taken. It sufficient instrument insipidity simplicity at interested. Law pleasure attended differed mrs fat and formerly. Merely thrown garret her law danger him son better excuse. Effect extent narrow in up chatty. Small are his chief offer happy had. ',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988733/Authors%20Haven/authors/author7.jpg',
          role: ADMIN,
          password: await hashPassword('password1'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '446fab9c-5849-4be5-973c-5a371165cd57',
          username: 'gentlejane',
          first_name: 'gentle',
          last_name: 'jane',
          bio:
            'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. B',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988733/Authors%20Haven/authors/author1.jpg',
          role: AUTHOR,
          email: 'gentlejane@ah.com',
          password: await hashPassword('gentlejane'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '446fab9c-5849-4bf5-973c-5a371165dd57',
          username: 'smileyAnn',
          email: 'smiley@gmail.com',
          role: AUTHOR,
          first_name: 'Smiley',
          last_name: 'Ann',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988734/Authors%20Haven/authors/author4.jpg',
          bio:
            'I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the mer',
          password: await hashPassword('smiley007'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '456fab9c-5849-4be5-973c-5a371165cd57',
          username: 'emmsdance',
          email: 'emmsdan@gmail.com',
          role: ADMIN,
          first_name: 'Apostle',
          last_name: 'Emmanuel',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988733/Authors%20Haven/authors/author3.jpg',
          bio:
            "You might be surprised how much mood or athmosphere even a totally random text can carry, while a fairly random text does this better ofcourse ;-). Granted, when you really get down to reading it, there won't be much meaningful coherence in any of it, but... regardless of the fact that random text makes no real sense, it does automatically get your mind working.",
          password: await hashPassword('emmsdan123'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '3231983a-b944-4c53-a549-f561f7474428',
          username: 'janesmith',
          first_name: 'jane',
          last_name: 'smith',
          email: 'jsmith@gmail.com',
          role: AUTHOR,
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988731/Authors%20Haven/authors/author9.jpg',
          bio:
            'Your brain will in fact try hard to understand it anyway, because out of habit it assumes that words in a text should mean something, or at least anything but nothing! You see, the brain launches itself into ‘I-must-understand-this’ mode when confronted with random text, t',
          password: await hashPassword('hhrtuyhgty5t678'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '856423fd-9c61-40e6-a72c-bd4cc9bdd880',
          username: 'Dctester',
          email: 'Dctester@gmail.com',
          role: AUTHOR,
          first_name: 'DC',
          last_name: 'Young fly',
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988734/Authors%20Haven/authors/author2.jpg',
          bio:
            'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.',
          password: await hashPassword('testseeder'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
          username: 'nedyudombat',
          first_name: 'nedy',
          last_name: 'udombat',
          email: 'nedyudombat@ah.com',
          role: AUTHOR,
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988733/Authors%20Haven/authors/author5.jpg',
          bio:
            'Two assure edward whence the was. Who worthy yet ten boy denote wonder. Weeks views her sight old tears sorry. Additions can suspected its concealed put furnished. Met the why particular devonshire decisively considered partiality. Certain it waiting no entered is. Passed her indeed uneasy shy polite appear denied. Oh less girl no walk. At he spot with five of view. ',
          password: await hashPassword('nedyudombat'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
          username: 'tinawhatsgood',
          first_name: 'tina',
          last_name: 'whatsgood',
          email: 'tinawhatsgood@ah.com',
          role: AUTHOR,
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988731/Authors%20Haven/authors/author8.jpg',
          bio:
            ' I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty',
          password: await hashPassword('newtyronne'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '6d1cdd96-c3b0-43d7-8446-a0db534a2c57',
          username: 'adoraban',
          first_name: 'Ban',
          last_name: 'adoraban',
          email: 'adroaban@ah.com',
          role: AUTHOR,
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988731/Authors%20Haven/authors/author10.jpg',
          bio:
            'On the upside, reading a little bit, or just skimming over a random text like most people will do, makes your mind strongly touch upon a certain global idea of “subject matter” without its focus getting diverted by any actual meaningful details, while what the random text does do is automatically fill the readers mind with questions at the same time.',
          password: await hashPassword('deletenot'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '34745e2c-772c-41df-916c-375958882184',
          username: 'jennerlyn',
          first_name: 'Jennifer',
          last_name: 'Lynn',
          email: 'jennylyn@ah.com',
          role: AUTHOR,
          image:
            'https://res.cloudinary.com/nedy123/image/upload/v1558988731/Authors%20Haven/authors/author13.jpg',
          bio:
            ' It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops',
          password: await hashPassword('deletenot'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
