import { TeamMemberProfile } from '../classes/team';

let Owner: TeamMemberProfile = {
    name: 'Tai Loughman',
    phone: '740 299 -4147',
    email: 'hello@tai-dye-studios.com',
    title: ['Owner', 'Designer']
}

export const TEAM: TeamMemberProfile[] = [
    {
        name: 'Tai Loughman',
        phone: '740 299 - 4147',
        email: 'hello@tai-dye-studios.com',
        imgURL: 'assets/images/team/1.jpg',
        socialLinks: [
            { name: 'facebook', url: 'https://facebook.com/taidyestudios', icon: 'fa-facebook' }
        ],
        title: ['Owner', 'Designer'],
        bio: 'Owner of Tai-Dye Studios, Tai is behind all of the designs you see on everything we sell.'
    },
    {
        name: 'Katie Loughman',
        email: 'kloughman13@gmail.com',
        imgURL: 'assets/images/team/1.jpg',
        title: 'Designer',
        bio: 'Creative and crucial in helping create a lot of our custom designs.'
    },
    {
        name: 'Jimi Flynn',
        phone: '220 465 - 0947',
        email: 'jimi@suremarketingsolutions',
        imgURL: 'assets/images/team/1.jpg',
        socialLinks: [
            {name: 'facebook', url: 'https://facebook.com/suremarketingsolutions', icon: 'fa-facebook'}
        ],
        title: ['Web Dev & Design','Marketing'],
        bio: 'Lead developer and web designer. Jimi plays a huge role in all of our marketing.'
    }
]